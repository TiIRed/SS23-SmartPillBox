const { ipcRenderer } = require("electron");

let deets

function initial(){
	dispense();
	fillMedList();
	startTime();
}


function Click(){
	location.href = "idle.html";
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
		username: "test"
	}
	ipcRenderer.send('Photo', deets)
})

ipcRenderer.on("cheese", 0)


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
function fillMedList(){
	med = document.getElementById('med');

	const medlist = ["medication a", "medication b", "medication c"];

	for (var i = 0; i < medlist.length; i++) {
		med.innerHTML += '<li class="drac-text drac-text-black">' + medlist[i] + "</li>";
	}
}



