const { ipcRenderer } = require("electron");
const KioskBoard = require('kioskboard');
const path = require('path');

function onSub(){
	if(document.getElementById("fname").value == undefined ||  document.getElementById("lname").value == undefined){
		error.push("Please Enter Your Name")
		console.log(error)
		ipcRenderer.send('pass', error);
	}
	else{
	first = document.getElementById("fname").value
	last = document.getElementById("lname").value

	sessionStorage.setItem("fName", first)
	sessionStorage.setItem("lName", last)
	
	return false
}
}

function onLoad(){
	if(sessionStorage.getItem("fName")){
		location.href = path.join(__dirname, 'setupEmail.html');
	}
	KioskBoard.run('.drac-input', {
		keysArrayOfObjects: null,
		keysJsonUrl: path.join(__dirname, "/node_modules/kioskboard/dist/kioskboard-keys-english.json"),
		theme: 'light'
	})
}



