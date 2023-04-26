const { ipcRenderer } = require("electron");

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

	// var Creds = {
	// 	fName: document.getElementById("fname").value,
	// 	lName: document.getElementById("lname").value,
	// 	email: document.getElementById("email").value,
	// 	pswd: document.getElementById("pswd").value,
	// 	pswd2: document.getElementById("pswd2").value,
	// 	mTime: document.getElementById("mTime").value,
	// 	mdTime: document.getElementById("mdTime").value,
	// 	eTime: document.getElementById("eTime").value,
	// }
	
	ipcRenderer.send('Credentials', Creds)
	
};