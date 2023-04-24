// Modules to control application life and create native browser window
const {app, BrowserWindow, ipcMain, dialog} = require('electron');
const VirtualKeyboard = require('electron-virtual-keyboard');
const Store = require('electron-store');
const path = require('path');
const { Client } = require("pg");
const bcrypt = require('bcryptjs');
const {PythonShell} = require('python-shell');
const client = new Client({
    user: 'sfransen',
    host: '10.227.14.61',
    database: 'pillbox',
    password: '$tephenO0',
    port: 5432,
})
client.connect()

let vkb

const store = new Store();

async function createWindow () {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    fullscreen: false,
    frame: true,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    }
  })

  global.WindowID = mainWindow.id;
  checkName = await store.get('user.fname')

  // and load the index.html of the app.
  if(checkName == undefined){
    mainWindow.loadFile('setupName.html')
  }
  else{
    mainWindow.loadFile('idle.html')
  }

  //Virtual Keyboard instance
  vkb = new VirtualKeyboard(mainWindow.webContents)

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
  mainWindow2 = new BrowserWindow({
    fullscreen: false,
    frame: true,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true,
      contextIsolation: false
    }
  })
  mainWindow2.loadFile(path.join(__dirname, 'idle.html'))
  mainWindow2.webContents.on('dom-ready', () => {
    WindowID = mainWindow2.id;
    mainWindow.destroy();
  })
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
  PythonShell.run('photoman.py', options).then(messages => {
    mainWindow.webContents.send('cheese', 0);
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
        title: 'E-mail Is Already In Use',
        detail: 'Please Use Another E-mail'
      })
      mainWindow.webContents.send('eVerify', false);
    }
    else{
      mainWindow.webContents.send('eVerify', true);
    }
  })
})