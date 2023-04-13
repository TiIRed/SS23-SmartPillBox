function Click(button){

	el = document.getElementById(button);
	
	if(button == "button1" && getTime() == mornTime()){
		location.href = "./alert.html";
	}
	if(button == "button2" && getTime() == midTime()){
		location.href = "./alert.html";
	}
	if(button == "button3" && getTime() == eveTime()){
		location.href = "./alert.html";
	}
	

}

function getTime(){
	let today = new Date();

 	let h = today.getHours();
 	let m = today.getMinutes();

 	return h+""+m;

}

function mornTime(){
	let hMorn = 10;
	let mMorn = "36";
	let time = formatTime(hMorn, mMorn);
	
	return time;

}

function midTime(){
	let hMid = 10;
	let mMid = "31";
	let time = formatTime(hMid, mMid);
	
	return time;
}

function eveTime(){
	let hEve = 10;
	let mEve = "31";
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

 	if(getTime() == mornTime() || getTime() == midTime() || getTime() == eveTime()){

 		
 		
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


function formatTime(hours, mins){

	if(hours > 12){
		hours = hours-12;
	}
	
	if(hours < 10){
		hours = "0" + hours;
	}
	
	if(mins < 10){
		mins = "0" + mins;
	}
	
	return hours+""+mins;

}