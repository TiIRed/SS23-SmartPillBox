const { ipcRenderer } = require("electron");

function onLoad() {
    ipcRenderer.send("medReq", 0)
}

ipcRenderer.on('medList', (event, data) => {
    mList = document.getElementById("medList")
    console.log(data)
    for (var i=0; i < data.length; i++){
        for (var j=0; j < data.length; j+=2){
            console.log(data[i][j])
            var li = document.createElement('li');
            li.appendChild(document.createTextNode(data[i][j] + " " + data[i][j+1]))
            mList.appendChild(li)
        }
    }
})