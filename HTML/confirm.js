const { ipcRenderer } = require("electron");

function onLoad() {
    ipcRenderer.send("timeReq", 0)
}

ipcRenderer.on('timeSend', (event,data) => {
    document.getElementById("Time").innerHTML = data + "-" +sessionStorage.getItem("email");
})

function Clicky() {
    ipcRenderer.send('dispose', 0)
    location.href = "idle.html"
}