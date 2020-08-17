var w = window;
var player = {}, lastTick = Date.now(), tickCount = 0;
var secondsPassed = 0, body;
var oldTimeStamp, timeStamp = new Date().getTime(), gameTime = 0;
var timeFactor = 1/1000;
var logging = new Boolean(true);

var p = w.player;
p.oldScore = 0;
p.scoreSpeed = 0;
p.gameScore = 2000000000;
p.makers = [];
p.user = "name";
p.gameTime = 0;
p.prestige = 0;
p.dimNum = 3;
p.maxDimNum = 3;
p.map = 'normalDims';
