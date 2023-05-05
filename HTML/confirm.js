const { ipcRenderer } = require("electron");

// function onLoad() {
//     ipcRenderer.send("medReq", 0)
// }

ipcRenderer.on('medList', (event, data) => {
    mList = document.getElementById("medList")
    console.log(data)
    for (medication in data){
        var li = document.createElement('li');
        li.appendChild(document.createTextNode(medication[0] + " " + medication[1]))
        mList.appendChild(li)
    }
})

function Clicky() {
    ipcRenderer.send('dispose', 0)
    location.href = "idle.html"
}