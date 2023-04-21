const { ipcRenderer } = require("electron");
var jQuery = $ = require('jquery');
require('electron-virtual-keyboard/client')(window, jQuery);

var keyboard = $('input:text').keyboard();

function onSub(){
	email = document.getElementById("email").value

	localStorage.setItem("email", email)

	ipcRenderer.send('secret', 0)
}