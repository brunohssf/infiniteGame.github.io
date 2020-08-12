function setCookie(cname, cvalue, exdays) {
	var d = new Date();
	d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
	var expires = "expires="+d.toUTCString();
	document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/;SameSite=None;Secure";
}

function getCookie(cname) {
	var cookieName = cname + "=";
	var ca = document.cookie.split('; ');
	for(var i = 0; i < ca.length; i++) {
		var c = ca[i];
		if (c.indexOf("infiniteGame=") == 0) {
		return c.substring(cookieName.length);
		}
	}
	return "";
}

function checkCookie() {
	var found = getCookie("infiniteGame");
	if (found != "") {
		console.log(found);
		console.log(player);
		player = JSON.parse(found);
		console.log(player);
	} else {
		name = prompt("Please enter your name:", "");
		if (name != "" && name != null) {
		user = JSON.stringify(player);
		setCookie("infiniteGame", user, 365);
		}
	}
}


