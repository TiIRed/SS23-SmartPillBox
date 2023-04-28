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
	manipTime(clock);

 	document.getElementById('head').innerHTML = clock;
	document.getElementById('dow').innerHTML = weekday[today.getDay()]
	setTimeout(startTime, 1000);
	
}

function manipTime(clock){
	
	if(clock.startsWith("1:") || clock.startsWith("2:") || clock.startsWith("3:") || clock.startsWith("4:") || clock.startsWith("5:") || clock.startsWith("6:") || clock.startsWith("7:") || clock.startsWith("8:") || clock.startsWith("9:")){
		clock = "0" + clock;
	}

	if (clock == (times[0] + ":00") || clock == (times[1] + ":00") || clock == (times[2] + ":00")){
		location.href = "alert.html"
	}
	
	if (clock > (times[0])){
		if(clock < (times[1])){
			if(clock < (times[2])){
				document.getElementById("button1bod").style.backgroundColor = "lightgreen"
				document.getElementById("button2bod").style.backgroundColor = "#ffff80"
				localStorage.setItem("current", "Midday");
			}
		}
		else{
			if(clock < (times[2])){
				document.getElementById("button1bod").style.backgroundColor = "lightgreen"
				document.getElementById("button2bod").style.backgroundColor = "lightgreen"
				document.getElementById("button3bod").style.backgroundColor = "#ffff80"
				localStorage.setItem("current", "Evening");
			}
			else{
				document.getElementById("button1bod").style.backgroundColor = "lightgreen"
				document.getElementById("button2bod").style.backgroundColor = "lightgreen"
				document.getElementById("button3bod").style.backgroundColor = "lightgreen"
				localStorage.setItem("current", "Morning");
			}
		}
	}
	else{
		document.getElementById("button1bod").style.backgroundColor = "#ffff80"
		document.getElementById("button2bod").style.backgroundColor = "#ff9580"
		document.getElementById("button3bod").style.backgroundColor = "#ff9580"
		localStorage.setItem("current", "Morning");
	}
}


function grabTimes(){
	localStorage.setItem("current", "Morning")
	startTime()
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
