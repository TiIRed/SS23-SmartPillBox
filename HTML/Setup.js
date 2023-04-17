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

	window.setup.sendCredentials(Creds);

	location.href = "./idle.html";
};