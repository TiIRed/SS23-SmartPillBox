function Click(button){

	el = document.getElementById(button);
	
	if(button == "button1" && getTime() == mornTime()){
		location.href = "./alert.html";
	}
	if(button == "button2" && getTime() == midTime()){
		location.href = "./alert.html";
	}
	if(button == "button3" && getTime() == eveTime()){
		location.href = "./alert.html";
	}
	

// Modules to control application life and create native browser window
const {app, BrowserWindow} = require('electron');
const path = require('path');
const { Pool, Client } = require("pg");
const { Notification } = require("electron");
const client = new Client({
    user: 'sfransen',
    host: '10.227.221.204',
    database: 'pillbox',
    password: '$tephenO0',
    port: 5432,
})
client.connect()

function createWindow () {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    fullscreen: false,
    frame: false,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })

  // and load the index.html of the app.
  mainWindow.loadFile('Setup.html')

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()
}

function getTime(){
	let today = new Date();
// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow()

<<<<<<< HEAD
 	let h = today.getHours();
 	let m = today.getMinutes();
 	let time = formatTime(h, m);

 	return time;

}

function mornTime(){
	let hMorn = 18;
	let mMorn = 35;
	let time = formatTime(hMorn, mMorn);
	console.log(time);
	return time;

}

function midTime(){
	let hMid = 10;
	let mMid = "31";
	let time = formatTime(hMid, mMid);
	
	return time;
}

function eveTime(){
	let hEve = 10;
	let mEve = "31";
	let time = formatTime(hEve, mEve);
	
	return time;
}


function startTime(){
	
	const today = new Date();
	let h = today.getHours();
	let m = today.getMinutes();
	let s = today.getSeconds();
 	m = checkTime(m);
 	s = checkTime(s);

 	if(getTime() == mornTime() || getTime() == midTime() || getTime() == eveTime()){

 		
 		
 	}

 	document.getElementById('head').innerHTML =  h + ":" + m + ":" + s;
	setTimeout(startTime, 1000);
}
 	
 

function checkTime(i) {
  if (i < 10) {i = "0" + i};  // add zero in front of numbers < 10
  return i;
}

function editTime(button, hours, mins){

	b = document.getElementById(button).innerHTML = formatTime(hours, mins)

}


function formatTime(hours, mins){

	if(hours > 12){
		hours = hours-12;
	}
	
	if(hours < 10){
		hours = "0" + hours;
	}
	
	if(mins < 10){
		mins = "0" + mins;
	}
	
	return hours+""+mins;

}
=======
  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
>>>>>>> 23e66b2c5afe1e6e6664e0ed497a594002cd4591
