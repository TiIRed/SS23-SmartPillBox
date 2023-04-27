const { ipcRenderer } = require("electron");
const KioskBoard = require('kioskboard');
const path = require('path');

function onSub(){
	medName = document.getElementById("med").value
	qnt = document.getElementById("medNum").value
	time = document.getElementById("Time").value
	days = []
	
	var markedCheckbox = document.getElementById("day");
	for (var checkbox of markedCheckbox){
		if(checkbox.checked){
			days.push(checkbox.value)
		}
	}
	print(days)
	location.href = path.join(__dirname, 'setupTime.html');
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



