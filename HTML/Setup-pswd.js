const { ipcRenderer } = require("electron");
var jQuery = $ = require('jquery');
require('electron-virtual-keyboard/client')(window, jQuery);

function onLoad(){
	ipcRenderer.send('key', 0);
}

let error = []

function onSub(){
	if(document.getElementById("pswd").value != document.getElementById("pswd2").value){
		error.push("Your Passwords do not match")
		console.log(error)
		ipcRenderer.send('pass', error);
	}
	else{
		pswd = document.getElementById("pswd").value
		
		localStorage.setItem("pswd", pswd)
		
		ipcRenderer.send('time', 0)
	}
}

ipcRenderer.on('keyreturn', () => {
	var keyboard = $('input:password').keyboard();
})
