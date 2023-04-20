const { ipcRenderer } = require("electron");

function inOff(id){

	if(document.getElementById(id).disabled == true){
		document.getElementById(id).disabled = false;
	}else{
		document.getElementById(id).disabled = true;
	}

}

function errorChecking(){
	let error = [];
	var Creds = {
		fName: document.getElementById("fname").value,
		lName: document.getElementById("lname").value,
		email: document.getElementById("email").value,
		pswd: document.getElementById("pswd").value,
		pswd2: document.getElementById("pswd2").value,
		mTime: document.getElementById("mTime").value,
		mdTime: document.getElementById("mdTime").value,
		eTime: document.getElementById("eTime").value,
	}
	if(!Creds.fName || !Creds.lName || !Creds.mTime || !Creds.mdTime || !Creds.eTime || !Creds.email || !Creds.pswd || !Creds.pswd2){
		error.push("Please fill entire form.");
		ipcRenderer.send('Setup', error);
	}
	else if(Creds.pswd != Creds.pswd2){
		error.push("Your Passwords do not match")
		ipcRenderer.send('Setup', error);
	}
	else{
		ipcRenderer.send('Credentials', Creds)
	}
};