const { ipcRenderer } = require("electron");

let times = []
let clock = ""
const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];


function clicky(){
	location.href = "alert.html"
}

function startTime(){
	
	const today = new Date();
	let h = today.getHours();
	let m = today.getMinutes();
	let s = today.getSeconds();
 	m = checkTime(m);
 	s = checkTime(s); 	

	clock = h + ":" + m + ":" + s;

 	document.getElementById('head').innerHTML = clock;
	document.getElementById('dow').innerHTML = weekday[today.getDay()]
	prideWeek(clock);
	setTimeout(startTime, 1000);
	
}

function prideWeek(clock){
	
	if(clock.startsWith("1:") || clock.startsWith("2:") || clock.startsWith("3:") || clock.startsWith("4:") || clock.startsWith("5:") || clock.startsWith("6:") || clock.startsWith("7:") || clock.startsWith("8:") || clock.startsWith("9:")){
		clock = "0" + clock;
	}

	if (clock == (times[0] + ":00") || clock == (times[1] + ":00") || clock == (times[2] + ":00")){
		window.location.href = "alert.html"
	}
	
	if (clock > (times[0])){
		if(clock < (times[1])){
			if(clock < (times[2])){
				document.getElementById("button1bod").className = "drac-box drac-bg-green drac-rounded-lg drac-p-md"
				document.getElementById("button2bod").className = "drac-box drac-bg-yellow drac-rounded-lg drac-p-md"
				localStorage.setItem("current", Midday);
			}
		}
		else{
			if(clock < (times[2])){
				document.getElementById("button1bod").className = "drac-box drac-bg-green drac-rounded-lg drac-p-md"
				document.getElementById("button2bod").className = "drac-box drac-bg-green drac-rounded-lg drac-p-md"
				document.getElementById("button3bod").className = "drac-box drac-bg-yellow drac-rounded-lg drac-p-md"
				localStorage.setItem("current", Evening);
			}
			else{
				document.getElementById("button1bod").className = "drac-box drac-bg-green drac-rounded-lg drac-p-md"
				document.getElementById("button2bod").className = "drac-box drac-bg-green drac-rounded-lg drac-p-md"
				document.getElementById("button3bod").className = "drac-box drac-bg-green drac-rounded-lg drac-p-md"
				localStorage.setItem("current", Morning);
			}
		}
	}
}


function grabTimes(){
	localStorage.setItem("current", Morning);
	startTime();
	ipcRenderer.send('timeRequest', 0)	
}

ipcRenderer.on('sets', (event, data) => {
	times = data

	document.getElementById("button1").textContent = times[0] + ":00";
	document.getElementById("button2").innerHTML = times[1] + ":00";
	document.getElementById("button3").innerText = times[2] + ":00";
})

function checkTime(i) {
  if (i < 10) {i = "0" + i};  // add zero in front of numbers < 10
  return i;
}

function formatTime(hours, mins){

	if(hours > 12){
		hours -= 12;
	}

	if(hours < 10){
		hours = "0" + hours;
	}
	
	if(mins < 10){
		mins = "0" + mins;
	}
	
	return hours+""+mins;

}
