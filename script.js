function httpGet(theUrl) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", theUrl, false ); // false for synchronous request
    xmlHttp.send( null );
    return xmlHttp.responseText;
}

var button = document.getElementById("button");

	var statsBox = document.createElement("DIV");
	statsBox.setAttribute("id", "stats-box");
	var sparks = document.createElement("P");
	var level = document.createElement("P");
	var userE = document.createElement("H2");

button.onclick= function() {
	var user = document.getElementById("input").value;
	document.getElementById("input").value = "";
	var text = httpGet("https://beam.pro/api/v1/channels/" + user);
	var jsonData = JSON.parse(text);
	
	if (jsonData.statusCode == 404) {
		confirm("Could not find " + user);
	} else {
		sparks.innerHTML = "Sparks: " + jsonData.user.sparks;
		level.innerHTML = "Level: " + jsonData.user.level;
		userE.innerHTML = jsonData.user.username;
		
		statsBox.appendChild(userE);
		statsBox.appendChild(sparks);
		statsBox.appendChild(level);
		
		document.getElementById("result").appendChild(statsBox);
	}

	
	
};
