const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld(
	'setup',
	{
		dispense: (data) => ipcRenderer.send('Dispense', data)
	}
)