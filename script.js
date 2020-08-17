function makerBuilder(i) {
	let maker = {
	cost: 10 + 10000 * i ** (2 + 3 * i * i) - 9000 * i,
	amount: 0,
	bought: 0,
	mult: 1 - (i / 10) + (i / 100)
	}
	return maker;
}

function gameLoop() {
	tempo = Date.now();
	var tick = (tempo - w.lastTick) * timeFactor;
	w.oldTimeStamp = w.timeStamp;

	/*buyAtom();*/

	scoreLoop(tick);
	checkUnlocks();
	updateGame();
	w.requestAnimationFrame(gameLoop);
	w.lastTick = tempo;
	if (tick > 1) {
		console.log(tickCount);
	}
	if ((w.scoreSpeed > 0) && (w.logging == true)) {
		w.tickCount ++;
	}
	w.player.gameTime += tick;
	document.getElementById("gameTime").innerHTML = 'Time: ' + w.player.gameTime.formatHour();

}

function scoreLoop(tick) {
	if (w.player.makers.length > 0) {
		w.player.scoreSpeed = w.player.makers[0].amount * w.player.makers[0].mult * (1.1 ** w.player.prestige);
		w.player.gameScore += w.player.makers[0].amount * w.player.makers[0].mult * tick * (1.1 ** w.player.prestige);
		for (i = 1; i < w.player.makers.length; i++)	{
				w.player.makers[i-1].amount += w.player.makers[i].amount * w.player.makers[i].mult * tick * (1.1 ** w.player.prestige);
		}
	}
}

function updateGame() {
	document.getElementById("score").innerHTML = 'Atoms: ' + formatP(Math.round(w.player.gameScore));
	document.getElementById("scoreSpeed").innerHTML = 'Speed: ' + formatP(Math.round(w.player.scoreSpeed*100)/100) + '/s';
	for (i = 0; i < w.player.makers.length; i++){
		bText = 'Make Atom Maker (' + formatP(Math.round(w.player.makers[i].cost*100)/100);
		bText += ') Amount: ' + formatP(Math.round(w.player.makers[i].amount));
		bText += ') Making: ' + formatP(Math.round(w.player.makers[i].amount * w.player.makers[i].mult*100)/100) + '/s';
		document.getElementById("maker"+i).innerHTML = bText;
		document.getElementById("maker"+i).classList = w.player.makers[i].bought+"0%";
	}
	saveState();
}

function saveState() {
    user = JSON.stringify(w.player);
    setCookie("infiniteGame", user, 365);
}

function buyAtom() {
	w.player.gameScore ++;
}

function buyAtomMaker(i) {
	if (w.player.gameScore >= w.player.makers[i].cost){
		w.player.gameScore -= w.player.makers[i].cost;
		w.player.makers[i].amount ++;
		w.player.makers[i].bought ++;
		w.player.makers[i].cost *= 1.25 + i;
		if (w.player.makers[i].bought == 10) {
			w.player.makers[i].mult *= 2;
			w.player.makers[i].bought = 0;
		}
	if ((w.player.dimNum == (i+1) && w.player.dimNum < 3) || (w.player.dimNum == (i+w.player.prestige) && w.player.dimNum < w.player.maxDimNum)) {
		console.log(w.player.dimNum);
		w.player.dimNum ++;
		buildGameMap();
        console.log(w.player.dimNum);

		}
/*		console.log(w.gameScore);
		console.log(w.makers[i].cost);
		console.log(i);
		console.log(w.makers[i].amount);
		console.log(w.makers[i].cost);*/
	}
}

function buyMax() {
	for (i = w.player.makers.length-1; i > -1; i--) {
		while (w.player.makers[i].cost < w.player.gameScore) {
			buyAtomMaker(i);
		}
	}
}

function prestige() {
	for (i = 0; i < w.player.makers.length; i ++) {
		w.player.makers[i].amount = 0;
		w.player.makers[i].bought = 0;
		w.player.makers[i].cost = 10 + 1000 * i ** (2 + 3 * i * i);
		w.player.makers[i].mult = 1 - (i / 10) + (i / 100);
		/*w.player.gameScore = 0;*/
	}
	w.player.prestige ++;
	if (w.player.prestige < 5 && w.player.maxDimNum < 8) {
		w.player.maxDimNum ++;
	}
	buildGameMap()
}

function restart() {
	for (i = 0; i < w.player.makers.length; i ++) {
		w.player.makers[i].amount = 0;
		w.player.makers[i].bought = 0;
		w.player.makers[i].cost = 10 + 1000 * i ** (2 + 3 * i * i);
		w.player.makers[i].mult = 1 - (i / 10) + (i / 100);
		w.player.gameScore = 0;
	}
}

function logOnOff() {
	logging = 1 - logging;
}

Number.prototype.formatHour = function () {
    var sec_num = parseInt(this, 10); // don't forget the second param
    sec_num *= 1000 * timeFactor;
    var hours   = Math.floor(sec_num / 3600);
    var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
    var seconds = Math.floor(sec_num - (hours * 3600) - (minutes * 60));

    if (hours   < 10) {hours   = "0"+hours;}
    if (minutes < 10) {minutes = "0"+minutes;}
    if (seconds < 10) {seconds = "0"+seconds;}
    return hours+':'+minutes+':'+seconds;
}

function sideNav(x) {
	x.classList.toggle("change");
}

function formatP(value) {
	if (value > 9999) {
		return value.toExponential(3);
	} else {
		return value
	}

}

function checkUnlocks() {
	var l = w.player.makers.length;
	if (l > 2) {
		if (w.player.makers[(l-1)].amount >= 1) {
			document.getElementById("prestige").classList.remove("disabled");
			document.getElementById("prestige").innerHTML = '<i class="fa fa-unlock"></i> Prestige';
			} else {
			document.getElementById("prestige").classList.add("disabled");
			document.getElementById("prestige").innerHTML = '<i class="fa fa-lock"></i> Prestige';
		}
	}
}

function onSignIn(googleUser) {
	var profile = googleUser.getBasicProfile();
	console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
	console.log('Name: ' + profile.getName());
	console.log('Image URL: ' + profile.getImageUrl());
	console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
	checkCookie();
}

buildGameMap(w.player.map)
gameLoop()