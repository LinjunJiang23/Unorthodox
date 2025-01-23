// src/characters/baseCharacter.js

class BaseCharacter {
  static validDirections = ['left', 'up', 'right', 'down', 'upleft', 
	'upright', 'downleft', 'downright'];
	
  constructor() {
	this.validModes = ['normal', 'combat', 'stealth'];
	this.validStates = ['idle', 'walk', 'run', 'backup'];
	this.id;
	this.app;
	this.model;
	this.actions;
	this.tag;
	this.intro;
	this.inventory;
	this.stats;
	this.currentFrame = 0;
	this.mode = 'normal';
	this.direction = 'down';
	this.state = "idle";
	this.action = "rest";
	this.idleTime = 0;
	this.lastUpdateTime = 0;
	this.relationshipManager;
  }
	
  set_intro(intro) {
	if (typeof intro === "string") this.intro = intro;
  }
 
  set_character_state(mode, state, direction) {
	if (BaseCharacter.validDirections.includes(direction) && this.validModes.includes(mode) && this.validStates.includes(state)) {
	  this.mode = mode;
	  this.state = state;
	  this.direction = direction;
	}
  }
  
  set_direction(direction) {
	if (baseCharacter.validDirections.includes(direction)) 
	  this.direction = direction;
  }
  
  set_state(state) {
    if (this.validStates.includes(state)) {
	  this.state = state;
	}
  }
  
  set_mode(mode) {
    if (this.validModes.includes(mode)) {
	  this.mode = mode;
	}
  }
  
  change_physical_position(newX, newY) {
	this.model.physics.change_position(newX, newY);
  }
  
};