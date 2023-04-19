// Modules to control application life and create native browser window
const {app, BrowserWindow, ipcMain, dialog} = require('electron');
const Store = require('electron-store');
const path = require('path');
const { Client } = require("pg");
const bcrypt = require('bcryptjs');
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
    frame: true,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true,
    }
  })

  global.WindowID = mainWindow.id;
  checkName = await store.get('user.fName')
  // and load the index.html of the app.
  if(checkName == undefined){
    console.log(checkName)
    mainWindow.loadFile('Setup.html')
  }
  else{
    mainWindow.loadFile('idle.html')
    console.log(checkName)
  }
  // Open the DevTools.
  // mainWindow.webContents.openDevTools()
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
  client.query(`SELECT * FROM logins WHERE email = $1`, [data.email], (err, results) => {
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
    }
    else{
      client.query(`INSERT INTO logins (fname, lname, email, password, mtime, mdtime, etime)
                VALUES ($1, $2, $3, $4, $5, $6, $7)
                 RETURNING id, password`,
                [data.fName, data.lName, data.email, hashedPass, data.mTime, data.mdTime, data.eTime], (err,results)=> {
                    if (err){
                      throw err;
                    }
                  })
                  store.set({
                    user: {
                      fname: data.fName,
                      lname: data.lName,
                      email: data.email,
                      pass: hashedPass,
                      mTime: data.mTime,
                      mdTime: data.mdTime,
                      eTime: data.eTime
                    }
                  })
                  mainWindow = BrowserWindow.fromId(WindowID);
                  mainWindow2 = new BrowserWindow({
                    fullscreen: true,
                    frame: true,
                    webPreferences: {
                      preload: path.join(__dirname, 'preload.js'),
                      nodeIntegration: true,
                    }
                  })
                  mainWindow2.loadFile(path.join(__dirname, "./idle.html"))
                  mainWindow2.webContents.once('dom-ready', () => {
                    WindowID = mainWindow2.id;
                    mainWindow.destroy();
                  })
        }
    }) 
})

ipcMain.on('Setup', (event, data) => {
  dialog.showMessageBox({
    type: 'error',
    buttons: ['Okay'],
    title: 'Please Fix Errors',
    detail: data.toString(),
  })
})