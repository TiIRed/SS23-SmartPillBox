const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld(
	'setup',
	{
		sendCredentials: (data) => ipcRenderer.send('Credentials', data)
	}
)