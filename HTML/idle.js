const { ipcRenderer } = require("electron");

let times = []
let clock = ""


function getTime(){
	let today = new Date();

 	let h = today.getHours();
 	let m = today.getMinutes();
 	time = formatTime(h, m);

 	return time;

}

function mornTime(){
	let hMorn = 10;
	let mMorn = 36;
	let time = formatTime(hMorn, mMorn);
	
	return time;

}

function clicky(){
	location.href = "dispense.html"
}

function midTime(){
	let hMid = 10;
	let mMid = 31;
	let time = formatTime(hMid, mMid);
	
	return time;
}

function eveTime(){
	let hEve = 10;
	let mEve = 10;
	let time = formatTime(hEve, mEve);
	
	return time;
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
	prideWeek(clock);
	setTimeout(startTime, 1000);
	
}

function prideWeek(clock){
	if (clock > (times[0] + ":00")){
		if(clock < (times[1] + ":00")){
			if(clock < (times[2] + ":00")){
				document.getElementById("button1bod").className = "drac-box drac-bg-green drac-rounded-lg drac-p-md"
				document.getElementById("button2bod").className = "drac-box drac-bg-yellow drac-rounded-lg drac-p-md"
			}
		}
		else{
			if(clock < (times[2] + ":00")){
				document.getElementById("button1bod").className = "drac-box drac-bg-green drac-rounded-lg drac-p-md"
				document.getElementById("button2bod").className = "drac-box drac-bg-green drac-rounded-lg drac-p-md"
				document.getElementById("button3bod").className = "drac-box drac-bg-yellow drac-rounded-lg drac-p-md"
			}
			else{
				document.getElementById("button1bod").className = "drac-box drac-bg-green drac-rounded-lg drac-p-md"
				document.getElementById("button2bod").className = "drac-box drac-bg-green drac-rounded-lg drac-p-md"
				document.getElementById("button3bod").className = "drac-box drac-bg-green drac-rounded-lg drac-p-md"
			}
		}
	}
}


function grabTimes(){
	startTime();
	console.log("im here")
	ipcRenderer.send('timeRequest', 0)	
}

ipcRenderer.on('sets', (event, data) => {
	times = data;
	console.log(times)

	document.getElementById("button1").textContent = times[0] + ":00";
	document.getElementById("button2").innerHTML = times[1] + ":00";
	document.getElementById("button3").innerText = times[2] + ":00";
})

function checkTime(i) {
  if (i < 10) {i = "0" + i};  // add zero in front of numbers < 10
  return i;
}

function editTime(button, hours, mins){
	b = document.getElementById(button).innerHTML = formatTime(hours, mins)
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
