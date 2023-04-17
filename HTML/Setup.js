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
		mTime: document.getElementById("mTime").value,
		mdTime: document.getElementById("mdTime").value,
		eTime: document.getElementById("eTime").value,
	}
	if(!Creds.fName || !Creds.lName || !Creds.mTime || !mdTime || !eTime){
		document.location.href = 'Setup.html';
	}
	else{
		document.location.href = './idle.html';
	}

	window.setup.sendCredentials(Creds);
};