const { ipcRenderer } = require("electron");
var jQuery = $ = require('jquery');
const path = require('path');
require('electron-virtual-keyboard/client')(window, jQuery);

var keyboard = $('input:text').keyboard();

function onSub(){
	if(document.getElementById("email").value == undefined){
		error.push("Please Enter Your Username")
		console.log(error)
		ipcRenderer.send('pass', error);
	}
	else{email = document.getElementById("email").value

	sessionStorage.setItem("email", email)

	ipcRenderer.send('eCheck', email);}
}

function onLoad(){
	if(sessionStorage.getItem("email")){
		window.location.href = path.join(__dirname = 'setupPswd.html');
		return false;
	}
}

ipcRenderer.on('eVerify', (event, data) => {
	if(data){
		window.location.href = path.join(__dirname = 'setupPswd.html');
	}
	else{
		sessionStorage.removeItem("email")
	}
})