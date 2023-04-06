function Click(button){

	el = document.getElementById(button)
	el.classList.toggle('visible');

	if(el.style.backgroundColor == "blue"){
		
		el.style.backgroundColor = "yellow";
			
	}else{

		el.style.backgroundColor = "blue";
		
	}

}

function startTime() {
	const today = new Date();
	let h = today.getHours();
	let m = today.getMinutes();
	let s = today.getSeconds();
 	m = checkTime(m);
 	s = checkTime(s);

	var pname = location.pathname.substring(location.pathname.lastIndexOf("/") + 1);
 	if(h == 12 && m == 37 && pname!="alert.html"){
 			console.log("time")
 		//document.getElementById("button1").style.backgroundColor = "green";
 		location.href = "./alert.html";
 	}else if((h+""+m != "1237") && pname == "alert.html"){
 		console.log("main")
 		location.href = "./Main.html"
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