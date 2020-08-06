let w = window;
var player = {}, makers = [], lastTick = Date.now(), tickCount = 0;
var secondsPassed = 0, gameScore = 200, scoreSpeed = 0, oldScore = 0, body;
let oldTimeStamp, timeStamp = new Date().getTime(), gameTime = 0;
var timeFactor = 1/1000;
var dimNum = 8;
var logging = new Boolean(true);

makers = player.makers;