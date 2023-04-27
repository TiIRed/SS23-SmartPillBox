const { ipcRenderer } = require("electron");

function errorChecking(){
	let error = [];
	
	var Creds = {
		fName: localStorage.getItem("fName"),
		lName: localStorage.getItem("lName"),
		email: localStorage.getItem("email"),
		pswd: localStorage.getItem("pswd"),
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