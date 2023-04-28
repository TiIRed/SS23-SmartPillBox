var mednum = 0;
var medarr = [];


function addMed(){

	medlist = document.getElementById("medlist");
	medIn = document.getElementById("med");
	quantIn = document.getElementById("quantity");
	unitIn = document.getElementById("unit");

	const para = document.createElement("li");
	const node = document.createTextNode(medIn.value+" "+quantIn.value+" "+unitIn.value);
	para.appendChild(node);
	para.id = "med" + mednum;
	mednum += 1;
	para.setAttribute("onclick","removeEl('"+para.id+"');");;


	medlist.appendChild(para);
	medarr = para.innerHTML.split(" ");	
	console.log(medarr);





	medIn.value = "";
	quantIn.value = "";
	unitIn.value = "";

	//readMeds();


}




function removeEl(e){

	document.getElementById(e).remove();

}

function readMeds(){
	var i = 0;

	for(const child of document.getElementById('medlist').children){
	
		medlist[i] = child.innerHTML;
		console.log(medlist);
		i+=1;

	}
}