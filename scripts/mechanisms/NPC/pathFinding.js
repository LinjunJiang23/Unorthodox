// scripts/mechanisms/NPC/pathFinding.js

/**
 * PathFinding - class that mainly uses A* algorithm
 * @var type - determines the mechanism to employ when collision detected
 */
class PathFinding {
	static validTypes = ['neutral', 'aggresive', 'coward', 'gentle', 'provocative'];
	constructor(type = 'neutral') {
		if (validTypes.include(type)) this.type = type;
		this.currentEnv;
	}

	collideWithObjects() {
	}
	
	collideWithPlayer() {
	}
};