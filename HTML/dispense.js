const { ipcRenderer } = require("electron");

let deets

function initial(){
	dispense();
	startTime();
}

function dispense(){
	ipcRenderer.send('Dispense', 0);
}

ipcRenderer.on("dispensed", () => {
	const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
	const d = new Date();
	let day = weekday[d.getDay()];

	var deets = {
		day: day,
		time: localStorage.getItem("current")
	}
	ipcRenderer.send('Photo', deets)
})

ipcRenderer.on("cheese", () => {
	location.href = "confirm.html";
})


function startTime() {
	const today = new Date();
	let h = today.getHours();
	let m = today.getMinutes();
	let s = today.getSeconds();
 	m = checkTime(m);
 	s = checkTime(s);

 	document.getElementById('head').innerHTML =  h + ":" + m + ":" + s;
	setTimeout(startTime, 1000);
 	}
 



function checkTime(i) {
  if (i < 10) {i = "0" + i};  // add zero in front of numbers < 10
  return i;
}

function editTime(button, hours, mins){

	b = document.getElementById(button).innerHTML = formatTime(hours, mins)

}



//pass array of medications into function to add list into html to be displayed
ipcRenderer.on('medList', (event, data) => {
    mList = document.getElementById("med")
    for (medication in data){
        var li = document.createElement('li');
        li.appendChild(document.createTextNode(medication[2] + " " + medication[1]))
        mList.appendChild(li)
    }
})



