// Modules to control application life and create native browser window
const {app, BrowserWindow, ipcMain, dialog} = require('electron');
const Store = require('electron-store');
const path = require('path');
const { Client } = require("pg");
const bcrypt = require('bcryptjs');
const {PythonShell} = require('python-shell');

const client = new Client({
    user: 'sfransen',
    host: 'localhost',
    database: 'pillbox',
    password: '$tephenO0',
    port: 5432,
})
client.connect()

const store = new Store();

async function createWindow () {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    fullscreen: true,
    frame: false,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    }
  })

  global.WindowID = mainWindow.id;
  checkName = await store.get('user.fname')

  // and load the index.html of the app.
    mainWindow.loadFile('setupEmail.html')

  // Open the DevTools.
  //mainWindow.webContents.openDevTools()
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})
// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
ipcMain.on("Credentials", async function(event, data) {
  hashedPass = await bcrypt.hash(data.pswd, 10);

  client.query(`INSERT INTO logins (fname, lname, email, password, mtime, mdtime, etime)VALUES ($1, $2, $3, $4, $5, $6, $7)RETURNING id, password`,[data.fName, data.lName, data.email, hashedPass, data.mTime, data.mdTime, data.eTime], (err,results)=> {
    if (err){
      throw err;
    }
    })
    store.set({
      'user.fname': data.fName,
      'user.lname': data.lName,
      'user.email': data.email,
      'user.pass': hashedPass,
      'user.mTime': data.mTime,
      'user.mdTime': data.mdTime,
      'user.eTime': data.eTime
    })
    mainWindow = BrowserWindow.fromId(WindowID);
    mainWindow.webContents.send('goodCred', 0);
  }  
)

//alerts that passwords do not match
ipcMain.on('pass', (event, data) => {
  dialog.showMessageBox({
    type: 'error',
    buttons: ['Okay'],
    title: 'Please Fix Errors',
    detail: data.toString(),
  })
})

//Dispense Meds
ipcMain.on('Dispense', () => {    
  mainWindow = BrowserWindow.fromId(WindowID);
  PythonShell.run('step_1.py', null).then(messages => {
    mainWindow.webContents.send('dispensed', 0);
  })
})

ipcMain.on('Photo', (error, data) => {
  let options = {
    args: [data.time, data.username, data.day]
  }
  global.timeNow = data.time;
  global.dayNow = data.day;
  PythonShell.run('photoman.py', options).then(messages => {
    mainWindow.webContents.send('cheese', );
  })
})

//send time inputs to idle screen
ipcMain.on('timeRequest', async () => {
  mainWindow = BrowserWindow.fromId(WindowID);
  morn = await store.get('user.mTime')
  mid = await store.get('user.mdTime')
  eve = await store.get('user.eTime')
  times = [morn, mid, eve]
  mainWindow.webContents.send('sets', times);
})

ipcMain.on('eCheck', (error, data) => {
  mainWindow = BrowserWindow.fromId(WindowID);

  client.query(`SELECT * FROM logins WHERE email = $1`, [data], (err, results) => {
    if(err){
      console.log(err);
    }

    console.log(results.rows);

    if(results.rows.length > 0){
      //message about email already used and redirct to setup screen
      dialog.showMessageBox({
        type: 'error',
        buttons: ['Okay'],
        title: 'Username Is Already In Use',
        detail: 'Please Use Another E-mail'
      })
      mainWindow.webContents.send('eVerify', false);
    }
    else{
      mainWindow.webContents.send('eVerify', true);
    }
  })
})

ipcMain.on("Meds", async function(event, data) {
  client.query(`INSERT INTO medications (name, quantity, time_name, days, username) VALUES ($1, $2, $3, $4, $5)`,[data.name, data.qnt, data.time, data.days, store.get('user.email')], (err,results)=> {
    if (err){
      throw err;
    }
    })
    mainWindow = BrowserWindow.fromId(WindowID);
    mainWindow.webContents.send('goodMeds', data.next);
  }  
)

ipcMain.on("medReq", async function(event,data) {
  //console.log(timeNow + " " + dayNow + " " + store.get('user.email'))
  
  que = ('SELECT * FROM medications WHERE username = '+"'SFRAN'"+' AND time_name = '+ "'Morning'"+' AND '+ "'Thursday'"+' = ANY(days)')
  
  const results = await client.query({
    rowMode: 'array',
    text: que,
  })
    mainWindow = BrowserWindow.fromId(WindowID)
    mainWindow.webContents.send('medList', results.rows)
})
//Dispense Meds
ipcMain.on('dispose', () => {    
  mainWindow = BrowserWindow.fromId(WindowID);
  PythonShell.run('dispose.py', null).then(messages => {
  })
})
