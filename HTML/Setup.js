function inOff(id){

	if(document.getElementById(id).disabled == true){
		document.getElementById(id).disabled = false;
	}else{
		document.getElementById(id).disabled = true;
	}


}