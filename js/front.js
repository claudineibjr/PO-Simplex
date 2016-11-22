var inputedFunction = "", inputRestriction = "";
var restrictions = newMatriz(1, 3);
var debug = true;

function onLoad(){
	setTabActive(0);

	//var teste;
	//teste = "1";
	//teste = "f1";
	//teste = "{+} <1>,<0>"
	//teste = "{+} <1>,<0>,<0>";
	//teste = "{+} <4>";
	//alert(replaceValues(teste, ["{", "}", "<", ">", "[", "]", " "], ""));

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

function createVisualTable(table, headerTable, titleTable){

	var divPai = document.getElementById("Div1");

	// Criação dos divs panel-primary, panel-Heading e panel-body
	var divPanelPrimary = document.createElement("div");	divPanelPrimary.setAttribute("class", "panel panel-primary");	divPanelPrimary.setAttribute("id", getLastElement("panelPrimary_"));
	var divPanelHeading = document.createElement("div");	divPanelHeading.setAttribute("class", "panel-heading");			divPanelHeading.setAttribute("id", getLastElement("panelHeading_"));	divPanelHeading.innerHTML = (titleTable == undefined ? getLastElement("Iteracao_").replace("ca","cã").replace("_", " ") : titleTable);
	var divPanelBody = document.createElement("div");		divPanelBody.setAttribute("class", "panel-body");				divPanelBody.setAttribute("id", getLastElement("panelBody"));

	divPai.appendChild(divPanelPrimary);
	divPanelPrimary.appendChild(divPanelHeading);
	divPanelPrimary.appendChild(divPanelBody);

	var numberRows, numbersColumn;
	numberRows = table.length;
	numbersColumn = table[0].length;// - 2 + table[0][2].length + table[0][3].length;

	var divTable = document.createElement("div");	divTable.setAttribute("class", "table-responsive");	divPanelBody.appendChild(divTable);
	var htmlTable = document.createElement("table");	htmlTable.setAttribute("class", "table");	htmlTable.setAttribute("id", getLastElement("Iteracao_"));	divTable.appendChild(htmlTable);

	var htmlRow = htmlTable.insertRow(0);
	for (var header = 0; header < headerTable.length; header++){
		var htmlCell = htmlRow.insertCell(header);
		htmlCell.innerHTML = headerTable[header];
	}

	for (var row = 0; row < numberRows; row++){
		var htmlRow = htmlTable.insertRow(row+1);

		var depth = 0, realColumn = 0;

		for (var column = 0; column < numbersColumn; column++){
			if (typeof table[row][column] == "object" ){
				for (depth = 0; depth < table[row][column].length; depth++ ){
					var htmlCell = htmlRow.insertCell(realColumn);
					var cellValue;

					cellValue = replaceValues(String(table[row][column][depth]), ["{", "}", "<", ">", "[", "]", " "], "");
					htmlCell.innerHTML = cellValue;
					realColumn++;
				}
			}else{
				var htmlCell = htmlRow.insertCell(realColumn);
				var cellValue;

				cellValue = replaceValues(String(table[row][column]), ["{", "}", "<", ">", "[", "]", " "], "");
				htmlCell.innerHTML = cellValue;
				realColumn++;
			}
		}
	}
}
function createDivWell(tabela){
	var divPai = document.getElementById("Div1");
	var divWell = document.createElement("div");	divWell.setAttribute("class", "well");	divPai.appendChild(divWell);

	var texto = "";
	for (var i = 0; i < tabela.length; i++){
		texto = texto + tabela[i][0] + " = " + tabela[i][tabela[i].length-1] + ", ";
	}

	divWell.innerHTML = "Resultado Final: " + texto.substr(0, texto.length-2);
}
function getLastElement(element){
	var iCount;
	iCount = 0;

	while(true){
		iCount++;

		if (document.getElementById(element + iCount) == null)
			return element + "" + iCount;
	}
}