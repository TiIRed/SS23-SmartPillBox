const { ipcRenderer } = require("electron");
var jQuery = $ = require('jquery');
require('electron-virtual-keyboard/client')(window, jQuery);

var keyboard = $('input:text').keyboard();

function onSub(){
	first = document.getElementById("fname").value
	last = document.getElementById("lname").value

	localStorage.setItem("fname", first)
	localStorage.setItem("lname", last)
	
	ipcRenderer.send('email', 0)
}