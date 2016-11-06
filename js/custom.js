function onLoad(){
	var tab = document.getElementById("Tab" + "0");	tab.setAttribute("class", "active");	
}

function setTabActive(IdTab){
	for (var i = 0; i < 4; i++){
		var tab = document.getElementById("Tab" + i);	tab.setAttribute("class", "inactive");		
		var div = document.getElementById("Div" + i);	div.style.display = "none";
	}
	var tab = document.getElementById("Tab" + IdTab);	tab.setAttribute("class", "active");

	var div = document.getElementById("Div" + IdTab);	div.style.display = "block";
}