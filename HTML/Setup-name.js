const { ipcRenderer } = require("electron");
var jQuery = $ = require('jquery');
const path = require('path');
require('electron-virtual-keyboard/client')(window, jQuery);

var keyboard = $('input:text').keyboard();

function onSub(){
	first = document.getElementById("fname").value
	last = document.getElementById("lname").value

	sessionStorage.setItem("fName", first)
	sessionStorage.setItem("lName", last)
	
	return false
}

function onLoad(){
	if(sessionStorage.getItem("fName")){
		window.location.href = path.join(__dirname = 'setupEmail.html');
	}
}