let up000 = {
	id: 'up000',
	name: 'Eternal Twenties',
	descr: 'Increases all makers outcome by 20%',
	dims: [0,1,2,3,4,5,6,7,8],
	factor: 0.2,
	bougth: 0,
	baseCost: 1e5 ** this.bougth,
	costMulti: 1e5,
	maxCount: 0
}

upgradeList = [];

function pushUpgrades() {
	for (i = 0; i < 1; i++) {
		var formattedNumber = ("00" + i).slice(-3);
		console.log('up' + formattedNumber);
		upgradeList.push('up' + formattedNumber);
	}
}

pushUpgrades()