var w = window;
var player = {}, lastTick = Date.now(), tickCount = 0;
var secondsPassed = 0, w.player.gameScore = 200, w.player.scoreSpeed = 0, w.player.oldScore = 0, body;
var oldTimeStamp, timeStamp = new Date().getTime(), gameTime = 0;
var timeFactor = 1/1000;
var dimNum = 8;
var logging = new Boolean(true);

w.player.makers = [];
var w.player.name = "name";