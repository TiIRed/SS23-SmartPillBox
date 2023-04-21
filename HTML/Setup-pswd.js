const { ipcRenderer } = require("electron");
var jQuery = $ = require('jquery');
const path = require('path');
require('electron-virtual-keyboard/client')(window, jQuery);

var keyboard = $('input:password').keyboard();

let error = []

function onSub(){
	if(document.getElementById("pswd").value != document.getElementById("pswd2").value){
		error.push("Your Passwords do not match")
		console.log(error)
		ipcRenderer.send('pass', error);
	}
	else{
		pswd = document.getElementById("pswd").value
		
		sessionStorage.setItem("pswd", pswd)
		
	}
}

function onLoad(){
	if(sessionStorage.getItem("pswd")){
		window.location.href = path.join(__dirname = 'setupTime.html');
	}
}
