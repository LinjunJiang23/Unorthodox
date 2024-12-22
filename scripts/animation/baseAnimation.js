// scripts/mechanisms/animation/baseAnimation.js

/**
 * Base class that centralizes all variable related to animation
 * @property {string} state 
 * @property {string} action
 * @property {number} currentFrame
 * @property {string} direction
 * @property {number} animationSpeed 
 * @property {number} lastUpdateTime 
 * @property spriteSheets
 */
 
class BaseAnimation {
	static validDirections = 
	  ['left', 'up', 'right', 'down', 'upleft', 
	   'upright', 'downleft', 'downright'];
	
	constructor(character) {
		this.character = character;
		this.idleTime = 0;
		this.state = "idle";
		this.action = "rest";
		this.currentFrame = 0;
		this.direction = "down";
		this.animationSpeed = 440;
		this.lastUpdateTime = 0;
		this.spriteSheets;
	}
	
	changeDirection(direction) {
		if (CompanionAnimation.validDirections.includes(direction)) {
			if (this.direction !== direction) this.direction = direction;
		}
	}
};