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
  
  change_physical_position(newPos) {
	this.physics.x = newPos.x;
	this.physics.y = newPos.y;
  }
	
};