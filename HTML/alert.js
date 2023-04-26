const { ipcRenderer } = require("electron");

function Click(){
	location.href = "./dispense.html";
}

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

function flash(){
	

	if(document.getElementbyId("body").style.backgroundColor == "white"){
		document.getElementbyId("body").backgroundColor = "gray";
	}else{document.getElementbyId("body").backgroundColor = "white";}

	
}