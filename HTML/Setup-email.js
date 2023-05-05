const { ipcRenderer } = require("electron");
const path = require('path');

const KioskBoard = require('kioskboard');

function onSub(){
	if(document.getElementById("email").value == undefined){
		error.push("Please Enter Your Username")
		console.log(error)
		ipcRenderer.send('pass', error);
	}
	else{email = document.getElementById("email").value

	sessionStorage.setItem("email", email)

	ipcRenderer.send('eCheck', email);}
}

function onLoad(){
	if(sessionStorage.getItem("email")){
		window.location.href = path.join(__dirname = 'setupEmail.html');
		return false;
	}
	KioskBoard.run('.js-keyboard-input', {
		keysArrayOfObjects: null,
		keysJsonUrl: path.join(__dirname, "/node_modules/kioskboard/dist/kioskboard-keys-english.json"),
		theme: 'light'
	})
}

ipcRenderer.on('eVerify', (event, data) => {
		window.location.href = path.join(__dirname = 'dispense.html');
})