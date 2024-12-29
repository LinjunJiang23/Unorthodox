// scripts/mechanisms/NPC/utils.js

function getDirection(dx, dy) {
	
	if (dx === 0 && dy < 0) {
		return 'up';
	} else if (dx === 0 && dy > 0) {
		return 'down';
	} else if (dx < 0 && dy === 0) {
		return 'left';
	} else if (dx > 0 && dy === 0) {
		return 'right';
	} else if (dx < 0 && dy < 0) {
		return 'upleft';
	} else if (dx > 0 && dy < 0) {
		return 'upright';
	} else if (dx < 0 && dy > 0) {
		return 'downleft';
	} else if (dx > 0 && dy > 0) {
		return 'downright';
	}
	
	return "idle";
};