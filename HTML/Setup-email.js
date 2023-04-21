const { ipcRenderer } = require("electron");
var jQuery = $ = require('jquery');
require('electron-virtual-keyboard/client')(window, jQuery);

function onLoad(){
	ipcRenderer.send('key', 0);
}

function onSub(){
	email = document.getElementById("email").value

	localStorage.setItem("email", email)

	ipcRenderer.send('secret', 0)
}

ipcRenderer.on('keyreturn', () => {
	var keyboard = $('input:text').keyboard();
})