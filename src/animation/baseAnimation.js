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
	static validModes = 
	  ['normal', 'combat', 'stealth'];
	constructor(character) {
		this.character = character;
		this.idleTime = 0;
		this.mode = 'normal';
		this.state = "idle";
		this.action = "rest";
		this.currentFrame = 0;
		this.direction = "down";
		this.animationSpeed = 440;
		this.lastUpdateTime = 0;
		this.spriteSheets;
		this.frameSheet;
		this.physics;
	}
	
	update_animation(timestamp) {
		const _check = this.isInViewport();
		if (_check) {
		  if ((timestamp - this.lastUpdateTime) > this.animationSpeed) {
			if (this.state === "idle" && this.idleTime > 300000) 
				console.log('Idle action animations should trigger after npc being idle for 5 min');
			this.currentFrame = (this.currentFrame + 1) % this.frameSheet[this.mode][this.direction][this.state]['baseBody'].length;
			this.lastUpdateTime = timestamp;
		  }
		  this.render();
		}
	}
	
	isInViewport() {
		const sPosition = camera.mapToScreen({x: this.physics.x, y: this.physics.y});
		if (
			sPosition.x + this.physics.width > 0  &&
			sPosition.y + this.physics.height > 0 && 
			sPosition.x < viewportSize.width &&
			sPosition.y < viewportSize.height
		) return true;
		return false;
	}
	
	set_direction(direction) {
		if (CompanionAnimation.validDirections.includes(direction)) {
			if (this.direction !== direction) this.direction = direction;
		}
	}
	
	get_state() {
		return this.state;
	}
	
	get_action() {
		return this.action;
	}

	get_direction() {
		return this.direction;
	}
	
	get_frameSheet() {
		return this.frameSheet;
	}
	
	get_physics() {
		return this.physics;
	}
	
	get_idleTime() {
		return this.idleTime;
	}
	
	get_currentFrame() {
		return this.currentFrame;
	}
	
};