const { ipcRenderer } = require("electron");

const path = require('path');

function onSub(){
	var Creds = {
		fName: sessionStorage.getItem("fName"),
		lName: sessionStorage.getItem("lName"),
		email: sessionStorage.getItem("email"),
		pswd: sessionStorage.getItem("pswd"),
		mTime: document.getElementById("mTime").value,
		mdTime: document.getElementById("mdTime").value,
		eTime: document.getElementById("eTime").value
	}
	ipcRenderer.send('Credentials', Creds)
};

ipcRenderer.on('goodCred', () =>{
	location.href = path.join(__dirname, "setupMeds.html")
})