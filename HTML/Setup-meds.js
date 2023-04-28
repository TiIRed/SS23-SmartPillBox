const { ipcRenderer } = require("electron");
const KioskBoard = require('kioskboard');
const path = require('path');

function onSub(){
	medName = document.getElementById("med").value
	qnt = document.getElementById("medNum").value
	time = document.getElementById("Time").value
	days = []
	
	var markedCheckbox = document.getElementsByName("day");
	for (var checkbox of markedCheckbox){
		if(checkbox.checked){
			days.push(checkbox.id)
		}
	}
	var medQuery = {
		name: medName,
		qnt: qnt,
		time: time,
		days: days,
		next: 'idle.html'
	}

	ipcRenderer.send('Meds', medQuery);
	ipcRenderer.on('goodMeds', (event, data) => {
		location.href = path.join(__dirname, data);
	})
	
}

function onAdd() {
	medName = document.getElementById("med").value
	qnt = document.getElementById("medNum").value
	time = document.getElementById("Time").value
	days = []
	
	var markedCheckbox = document.getElementsByName("day");
	for (var checkbox of markedCheckbox){
		if(checkbox.checked){
			days.push(checkbox.id)
		}
	}
	var medQuery = {
		name: medName,
		qnt: qnt,
		time: time,
		days: days,
		next: 'setupMeds.html'
	}

	ipcRenderer.send('Meds', medQuery);
	ipcRenderer.on('goodMeds', (event, data) => {
		location.href = path.join(__dirname, data);
	})
}

function onLoad(){
	KioskBoard.run('.drac-input', {
		keysArrayOfObjects: null,
		keysJsonUrl: path.join(__dirname, "/node_modules/kioskboard/dist/kioskboard-keys-english.json"),
		theme: 'light'
	})
}



