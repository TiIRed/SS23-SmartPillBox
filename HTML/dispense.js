const { ipcRenderer } = require("electron");

let deets

function initial(){
	dispense();
	startTime();
	meds();
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
		time: localStorage.getItem("current"),
		username: sessionStorage.getItem("email")
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
function meds() {
    mList = document.getElementById("med")
        var li = document.createElement('li');
        li.appendChild(document.createTextNode("M&Ms"))
        mList.appendChild(li)
}



