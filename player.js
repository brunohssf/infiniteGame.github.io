var w = window;
var player = {}, lastTick = Date.now(), tickCount = 0;
var secondsPassed = 0, body;
var oldTimeStamp, timeStamp = new Date().getTime(), gameTime = 0;
var timeFactor = 1/1000;
var logging = new Boolean(true);

w.player.oldScore = 0;
w.player.scoreSpeed = 0;
w.player.gameScore = 2000000000;
w.player.makers = [];
w.player.user = "name";
w.player.gameTime = 0;
w.player.prestige = 0;
w.player.dimNum = 3;
w.player.maxDimNum = 3;
