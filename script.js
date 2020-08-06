var player = {}, makers = [], lastTick = Date.now(), tickCount = 0;
var secondsPassed = 0, gameScore = 200, scoreSpeed = 0, oldScore = 0, body;
let oldTimeStamp, timeStamp = new Date().getTime(), w = window, gameTime = 0;
var timeFactor = 1/1000;
var dimNum = 8;
var logging = new Boolean(true);

function makerBuilder(i) {
	let maker = {
	cost: 10 + 10000 * i ** (2 + 3 * i * i) - 9000 * i,
	amount: 0,
	bought: 0,
	mult: 1 - (i / 10) + (i / 100)
	}
	return maker;
}

function buildGameMap() {
	for (i = 0; i < dimNum; i++){
		w.makers.push(makerBuilder(i));
		}
	w.body = '<h1 id="score">Atoms: 0</h1><h6 id="scoreSpeed">Speed: 0</h6>';
	w.body = w.body + '<button onClick="buyAtom();" type="button">Make Atom</button>';
	for (i = 0; i < w.makers.length; i++){
		w.body = w.body + '<button id="maker'+i+'" class="00%" onClick="buyAtomMaker('+i+');" ><div id="maker'+i+'Bar" class="progressBar"></div>Make Atom Maker ('+w.makers[i].cost+')</div>';

	}
	w.body = w.body + '<button id="buyMax" onClick="buyMax();" type="button">Buy Max!</button>';
	w.body = w.body + '<button id="log" onClick="logOnOff();" type="button">LogOnOff</button>';
	w.body = w.body + '<button id="prestige" onClick="prestige();" type="button">Prestige</button>';
	w.body = w.body + '<h3 id="gameTime">Tempo: 00</h3>';
	document.getElementById("game").innerHTML = body;
	console.log(w.gameScore);
	console.log(w.makers[0].mult);
	gameLoop();
}

function gameLoop() {
	tempo = Date.now();
	var tick = (tempo - w.lastTick) * timeFactor;
	w.oldTimeStamp = w.timeStamp;

	/*buyAtom();*/

	scoreLoop(tick);
	updateGame();
	w.requestAnimationFrame(gameLoop);
	w.lastTick = tempo;
	if (tick > 1) {
		console.log(tickCount);
	}
	if ((w.scoreSpeed > 0) && (w.logging == true)) {
		w.tickCount ++;
	}
	gameTime += tick;
	document.getElementById("gameTime").innerHTML = 'Time: ' + gameTime.formatHour();

}

function scoreLoop(tick) {
	w.scoreSpeed = w.makers[0].amount * w.makers[0].mult;
	w.gameScore += w.makers[0].amount * w.makers[0].mult * tick;
	for (i = 1; i < makers.length; i++)	{
			w.makers[i-1].amount += w.makers[i].amount * w.makers[i].mult * tick
		}
}

function updateGame() {
	document.getElementById("score").innerHTML = 'Atoms: ' + Math.round(w.gameScore);
	document.getElementById("scoreSpeed").innerHTML = 'Speed: ' + Math.round(w.scoreSpeed*100)/100 + '/s';
	for (i = 0; i < w.makers.length; i++){
		bText = 'Make Atom Maker (' + Math.round(w.makers[i].cost*100)/100;
		bText += ') Amount: ' + Math.round(w.makers[i].amount);
		if (i+1 < w.makers.length){
			bText += ') Speed: ' + Math.round(w.makers[i+1].amount * w.makers[i+1].mult*100)/100 + '/s';
		}
		document.getElementById("maker"+i).innerHTML = bText;
		document.getElementById("maker"+i).classList.remove((w.makers[i].bought-1)+"0%");
		document.getElementById("maker"+i).classList.add((w.makers[i].bought)+"0%");
	}
	updatePlayer();
}

function updatePlayer() {
	w.player.score = w.gameScore;
	w.player.scoreSpeed = w.scoreSpeed;
	w.player.makers = w.makers;
}

function buyAtom() {
	w.gameScore ++;
}

function buyAtomMaker(i) {
	if (w.gameScore >= w.makers[i].cost){
		w.gameScore -= w.makers[i].cost;
		w.makers[i].amount ++;
		w.makers[i].bought ++;
		w.makers[i].cost *= 1.25 + i;
		if (w.makers[i].bought == 10) {
			w.makers[i].mult *= 2;
			w.makers[i].bought = 0;
		}
/*		console.log(w.gameScore);
		console.log(w.makers[i].cost);
		console.log(i);
		console.log(w.makers[i].amount);
		console.log(w.makers[i].cost);*/
	}
}

function buyMax() {
	for (i = w.makers.length-1; i > -1; i--) {
		while (w.makers[i].cost < w.gameScore) {
			buyAtomMaker(i);
		}
	}
}

function prestige() {
	for (i = 0; i < w.makers.length; i ++) {
		w.makers[i].amount = 0;
		w.makers[i].bought = 0;
		w.makers[i].cost = 10 + 1000 * i ** (2 + 3 * i * i);
		w.makers[i].mult *= 1.1;
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

buildGameMap()
