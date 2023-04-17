const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld(
	'setup',
	{
		sendCredentials: (data) => ipcRenderer.send('Credentials', data),
		idle: () => ipcRenderer.send('Idle', 0),
		refresh: () => ipcRenderer.send('Setup', 0)
	}
)