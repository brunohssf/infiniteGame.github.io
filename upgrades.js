w.player.upgradeList = [];


w.player.upgradeList[0] = {
	id: 'up000',
	name: 'Eternal Twenties',
	descr: 'Increases all makers outcome by 20%',
	dims: [0,1,2,3,4,5,6,7,8],
	factor: 1.2,
	bougth: 0,
	baseCost: 2e5,
	costMult: 1e5,
	maxCount: 0
}

w.player.upgradeList[1] = {
	id: 'up001',
	name: 'Better Bonding',
	descr: 'Doubles atom outcome',
	dims: [0],
	factor: 2,
	bougth: 0,
	baseCost: 1e8,
	costMult: 1e8,
	maxCount: 1
}

w.player.upgradeList[2] = {
	id: 'up002',
	name: 'Quark Multiplier',
	descr: 'Increases all makers production.',
	dims: [0,1,2,3,4,5,6,7,8],
	factor: 1.25,
	bougth: 0,
	baseCost: 1e30,
	costMult: 1e30,
	maxCount: 1
}
