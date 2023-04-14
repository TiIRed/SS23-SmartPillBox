function inOff(id){

	if(document.getElementById(id).disabled == true){
		document.getElementById(id).disabled = false;
	}else{
		document.getElementById(id).disabled = true;
	}

}
function onsubmit(){
	let errors = [];

	if (!fname | !lname | !mTime | !mdTime | !eTime){
		errors.push("Please enter all fields")
	}
	new Notification({
		title: "Please Fill Out Form Properly",
		body: errors,
	}).show();
}