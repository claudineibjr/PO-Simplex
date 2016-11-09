var inputedFunction = "", inputRestriction = "";
var restrictions = newMatriz(1, 3);

function onLoad(){
	setTabActive(0);
}

function setTabActive(IdTab){
	for (var i = 0; i < 5; i++){
		var tab = document.getElementById("Tab" + i);	tab.setAttribute("class", "inactive");		
		var div = document.getElementById("Div" + i);	div.style.display = "none";
	}
	var tab = document.getElementById("Tab" + IdTab);	tab.setAttribute("class", "active");

	var div = document.getElementById("Div" + IdTab);	div.style.display = "block";
}

function addValueToFunction(typeValue){
	var number = (typeValue == "function" ? document.getElementById("functionNumber").value : document.getElementById("restrictionNumber").value);
	var variable = (typeValue == "function" ? document.getElementById("functionVariable").value : document.getElementById("restrictionVariable").value);
	var myFunction = (typeValue == "function" ? document.getElementById("function").value : (document.getElementById("restriction" + restrictions.length) == null ? "" : document.getElementById("restriction" + restrictions.length).value));

	if (typeValue == "function"){
		inputedFunction = inputedFunction + (number.indexOf("-") > -1 ? "{-}" : "{+}" ) + " " + "<" + (number.indexOf("-") > -1 ? number * -1 : number ) + ">" + " " + "[" + variable + "]" + " ";
		document.getElementById("function").value = myFunction + (myFunction.length == 0 ? "" : (number.indexOf("-") > -1 ? "" : "+")) + number + variable + " ";
	} else{
		if (document.getElementById("restriction" + restrictions.length) == null){
			addInputRestriction(false, myFunction, number, variable);
		}
		inputRestriction = inputRestriction + (number.indexOf("-") > -1 ? "{-}" : "{+}" ) + " " + "<" + (number.indexOf("-") > -1 ? number * -1 : number ) + ">" + " " + "[" + variable + "]" + " ";
		document.getElementById("restriction" + restrictions.length).value = myFunction + (myFunction.length == 0 ? "" : (number.indexOf("-") > -1 ? "" : "+")) + number + variable + " ";
	}
}

function addRestriction(){
	document.getElementById("restriction" + restrictions.length).value = document.getElementById("restriction" + restrictions.length).value + document.getElementById("restrictionSignal").value + " " + document.getElementById("restrictionNumberEqual").value;
	restrictions.push([inputRestriction, document.getElementById("restrictionSignal").value, (document.getElementById("restrictionNumberEqual").value.indexOf("-") > -1 ? "{-}" : "{+}" ) + document.getElementById("restrictionNumberEqual").value]);
	addInputRestriction(true);
	inputRestriction = "";
}

function addInputRestriction(isNewInput, myFunction, number, variable){
	var painel = document.getElementById("restrictionsPanel");
	var newInput     = document.createElement("input");

	newInput.setAttribute("id", "restriction" + restrictions.length);
	newInput.setAttribute("value", (isNewInput == true ? "" : myFunction + (myFunction.length == 0 ? "" : (number.indexOf("-") > -1 ? "" : "+")) + number + variable + " "));
	newInput.setAttribute("type", "text");
	newInput.setAttribute("class", "form-control");
	newInput.setAttribute("placeholder", "Restrição " + (restrictions.length + 1));		
	newInput.setAttribute("readonly", "");	
	painel.appendChild(newInput);	
}