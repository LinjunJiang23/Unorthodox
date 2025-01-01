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
 
class BaseModel {
	constructor(character) {
		this.character = character;
		this.animationSpeed = 440;
		this.lastUpdateTime = 0;
		this.frameSheet;
		this.spriteSheets;
		this.physics;
	}
	
	update(timestamp) {
		const _check = this.isInViewport();
		
		if (_check) {
		  if ((timestamp - this.character.lastUpdateTime) > this.animationSpeed) {
			if (this.character.state === "idle" && this.character.idleTime > 300000) 
				console.log('Idle action animations should trigger after npc being idle for 5 min');
			this.character.currentFrame = (this.character.currentFrame + 1) % 
				this.frameSheet[this.character.mode][this.character.direction][this.character.state]['baseBody'].length;
			this.character.lastUpdateTime = timestamp;
			
		  }
		}
	}
	
	isInViewport() {
		const sPosition = 
		  this.character.logic.engine.camera.map_to_screen({x: this.physics.x, y: this.physics.y});
		
		
		if (
			sPosition.x + this.physics.width > 0  &&
			sPosition.y + this.physics.height > 0 && 
			sPosition.x < this.character.logic.engine.settings.graphics.resolution.viewportWidth &&
			sPosition.y < this.character.logic.engine.settings.graphics.resolution.viewportHeight
		) {
			return true;
		}
		return false;
	}
	
	
	get_frameSheet() {
		return this.frameSheet;
	}
	
	get_physics() {
		return this.physics;
	}
	
	get_spriteSheets() {
		return this.spriteSheets;
	}
	
	
};