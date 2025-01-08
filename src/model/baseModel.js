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
		this.spriteSheets;
		this.physics;
		this.animation;
	}
	
	update(timestamp) {
		const _check = this.isInViewport();
		
		if (_check) {
		  this.animation.update(timestamp);
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
	
	get_map_position() {
		return {
			x: this.physics.x,
			y: this.physics.y
		};
	}
	
	get_screen_position() {
		const pos = { x: this.animation.x, y: this.animation.y };
		return pos;
	}
	
};