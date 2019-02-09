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
	var register = document.createElement("P");
	var userE = document.createElement("H2");


button.onclick= function() {
  window.location.search = document.getElementById("input").value;
}


window.onload = function() {
  console.log("he");
  if (window.location.search != "") {
    document.getElementById("input").value = window.location.search.substring(1, window.location.search.length);

    var user = document.getElementById("input").value;
  	document.getElementById("input").value = "";
  	var text = httpGet("https://beam.pro/api/v1/channels/" + user);
  	var jsonData = JSON.parse(text);

  	if (jsonData.statusCode == 404) {
  		alert("Could not find " + user);
  	} else {
  		sparks.innerHTML = "Sparks: " + jsonData.user.sparks;
  		level.innerHTML = "Level: " + jsonData.user.level;
  		register.innerHTML = "Joined: " + jsonData.user.createdAt.substring(0, 10);
  		userE.innerHTML = jsonData.user.username;

  		statsBox.appendChild(userE);
  		statsBox.appendChild(level);
  		statsBox.appendChild(sparks);
  		statsBox.appendChild(register);

  		document.getElementById("result").appendChild(statsBox);
    }
  }
}
