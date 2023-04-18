function inOff(id){

	if(document.getElementById(id).disabled == true){
		document.getElementById(id).disabled = false;
	}else{
		document.getElementById(id).disabled = true;
	}

}

function errorChecking(){
	
	var Creds = {
		fName: document.getElementById("fname").value,
		lName: document.getElementById("lname").value,
		email: document.getElementById("email").value,
		pswd: document.getElementById("pswd").value,
		mTime: document.getElementById("mTime").value,
		mdTime: document.getElementById("mdTime").value,
		eTime: document.getElementById("eTime").value,
	}
	if(!Creds.fName || !Creds.lName || !Creds.mTime || !Creds.mdTime || !Creds.eTime || !Creds.email || !Creds.pswd){
		window.setup.refresh();
	}
	else{
		window.setup.sendCredentials(Creds);
		window.setup.idle();
	}
};