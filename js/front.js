var inputedFunction = "";
var inputedRestrictions = new Array();

function onLoad(){
	setTabActive(0);
	calcSimplex();
}

function setTabActive(IdTab){
	for (var i = 0; i < 5; i++){
		var tab = document.getElementById("Tab" + i);	tab.setAttribute("class", "inactive");		
		var div = document.getElementById("Div" + i);	div.style.display = "none";
	}
	var tab = document.getElementById("Tab" + IdTab);	tab.setAttribute("class", "active");

	var div = document.getElementById("Div" + IdTab);	div.style.display = "block";
}

function addValueToFunction(){
	var number = document.getElementById("number").value;
	var variable = document.getElementById("variable").value;
	var myFunction = document.getElementById("function").value;

	inputedFunction = inputedFunction + (number.indexOf("-") > -1 ? "{-}" : "{+}" ) + " " + "<" + (number.indexOf("-") > -1 ? number * -1 : number ) + ">" + " " + "[" + variable + "]" + " ";
	
	document.getElementById("function").value = myFunction + (myFunction.length == 0 ? "" : (number.indexOf("-") > -1 ? "" : "+")) + number + variable + " ";
}

function addValueToRestrictions(){
	
	inputedRestrictions.push(0);

	var painel = document.getElementById("restrictionsPanel");
	var newInput     = document.createElement("input");

	newInput.setAttribute("type", "text");
	newInput.setAttribute("class", "form-control");
	newInput.setAttribute("placeholder", "Restrição " + inputedRestrictions.length);		
	newInput.setAttribute("readonly", "");	
	painel.appendChild(newInput);

	/*
	var number = document.getElementById("number").value;
	var variable = document.getElementById("variable").value;
	var myFunction = document.getElementById("function").value;

	inputedFunction = inputedFunction + (number.indexOf("-") > -1 ? "{-}" : "{+}" ) + " " + "<" + (number.indexOf("-") > -1 ? number * -1 : number ) + ">" + " " + "[" + variable + "]" + " ";
	
	document.getElementById("function").value = myFunction + (myFunction.length == 0 ? "" : (number.indexOf("-") > -1 ? "" : "+")) + number + variable + " ";
	*/
	

}