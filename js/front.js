var inputedFunction = "", inputRestriction = "";
var restrictions = newMatriz(1, 3);
var debug = false;

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

function createVisualTable(table){

	var row, column;
	row = table.length;
	column = table[0].length - 2 + table[0][2].length + table[0][3].length ;

	var divTable = document.createElement("div");	divTable.setAttribute("class", "table-responsive");	document.getElementById("bodyPanelTable").appendChild(divTable);


	//var header = ["", "if", "then", "else", "=", "v", "id", "(", ")", "$", "S", "E"];	

	for (row = 0; row < 17; row++){
		var htmlRow = htmlTable.insertRow(row);

		for (column = 0; column < 12; column++){
			var cell = htmlRow.insertCell(column);
			
			//if (row == 0)
				//cell.innerHTML = header[column];
			//else {
				if (column == 0)
					cell.innerHTML = row-1;
				else
					cell.innerHTML = table[row-1][column-1];
			//}
		}

	}	

	htmlBody.appendChild(htmlTable);
	htmlTable.setAttribute("border", "2");
	htmlTable.setAttribute("id", "SintaxTable");

	document.getElementById("SintaxTable").style.display = "none";

}