const { ipcRenderer } = require("electron");
const KioskBoard = require('kioskboard');
const path = require('path');

let error = []

function onSub(){
	if(document.getElementById("pswd").value == undefined){
		error.push("Please Enter Your Password")
		console.log(error)
		ipcRenderer.send('pass', error);
	}
	else if(document.getElementById("pswd").value != document.getElementById("pswd2").value){
		error.push("Your Passwords do not match")
		console.log(error)
		ipcRenderer.send('pass', error);
	}
	else{
		pswd = document.getElementById("pswd").value
		sessionStorage.setItem("pswd", pswd)	
	}
}

function onLoad(){
	if(sessionStorage.getItem("pswd")){
		location.href = path.join(__dirname, 'setupTime.html');
	}
	KioskBoard.run('.js-keyboard-input', {
		keysArrayOfObjects: null,
		keysJsonUrl: path.join(__dirname, "/node_modules/kioskboard/dist/kioskboard-keys-english.json"),
		theme: 'light'
	})
}
