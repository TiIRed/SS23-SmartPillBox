const { ipcRenderer } = require("electron");

function initial(){

	fillMedList();
	startTime();
}


function Click(){
	dispense();
	location.href = "Main.html";
}

function dispense(){

	ipcRenderer.send('Dispense', data);

}


function startTime() {
	let hMorn = 10;
	let mMorn = "03";


	const today = new Date();
	let h = today.getHours();
	let m = today.getMinutes();
	let s = today.getSeconds();
 	m = checkTime(m);
 	s = checkTime(s);

	var pname = location.pathname.substring(location.pathname.lastIndexOf("/") + 1);
 	if(h == hMorn && m == mMorn && pname!="alert.html"){
 			console.log("time")
 		//document.getElementById("button1").style.backgroundColor = "green";
 		location.href = "./alert.html";
 	}
 		
 	
 	
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
		med.innerHTML += "<li>" + medlist[i] + "</li>";
	}

}



