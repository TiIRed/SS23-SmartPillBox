load(){

	flash();
	startTime();

}

function Click(){

	

	location.href = "dispense.html";
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
 	}else if((h+""+m != "1620") && pname == "alert.html"){
 		console.log("main")
 		//location.href = "./Main.html"
 	}
 		
 	
 	
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