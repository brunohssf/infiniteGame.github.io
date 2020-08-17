function buildGameMap(x) {
	w.player.map = x;
	if ((w.player.map == 'normalDims') || (w.player.map == null)) {
		if (w.player.makers.length < w.player.dimNum) {
			for (i = w.player.makers.length; i < w.player.dimNum; i++){
				w.player.makers.push(makerBuilder(i));
				}
			}
		w.body = '<h1 id="score">Atoms: 0</h1><h6 id="scoreSpeed">Speed: 0</h6>';
		w.body = w.body + '<button onClick="buyAtom();" type="button">Make Atom</button>';
		for (i = 0; i < w.player.makers.length; i++){
			w.body = w.body + '<button id="maker'+i+'" class="00%" onClick="buyAtomMaker('+i+');" ><div id="maker'+i+'Bar" class="progressBar"></div>Make Atom Maker ('+w.player.makers[i].cost+')</div>';

		}
		w.body = w.body + '<button id="prestige" onClick="prestige();" type="button">Prestige</button>';
		w.body = w.body + '<button id="buyMax" onClick="buyMax();" type="button">Buy Max!</button>';
		w.body = w.body + '<h3 id="gameTime">Tempo: 00:00:00</h3>';
		var menu = '';
		menu = menu + '<button id="log" onClick="logOnOff();" type="button">LogOnOff</button>';
		if (w.player.user == "brunohssf") {
			menu = menu + '<button id="restart" onClick="restart();" type="button">Restart</button>';
		}
		menu = menu + '<div class="g-signin2" data-onsuccess="onSignIn">Login</div>';
		menu = menu + '<button onclick="signOut();">Sign out</button>';


		document.getElementById("game").innerHTML = body;
		document.getElementById("menu").innerHTML = menu;
		console.log(w.player.gameScore);
	}
}
