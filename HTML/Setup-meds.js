const { ipcRenderer } = require("electron");
const KioskBoard = require('kioskboard');
const path = require('path');

function onSub(){
	medName = document.getElementById("med").value
	qnt = document.getElementById("medNum").value
	

	sessionStorage.setItem("fName", first)
	sessionStorage.setItem("lName", last)
	
	return false
}

function onAdd() {

}

function onLoad(){
	KioskBoard.run('.drac-input', {
		keysArrayOfObjects: null,
		keysJsonUrl: path.join(__dirname, "/node_modules/kioskboard/dist/kioskboard-keys-english.json"),
		theme: 'light'
	})
}



