// src/characters/baseCharacter.js

class BaseCharacter {
  static validDirections = ['left', 'up', 'right', 'down', 'upleft', 
	'upright', 'downleft', 'downright'];
  static validModes = ['normal', 'combat', 'stealth'];
	
  constructor() {
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
	this.state;
	this.action;
	this.direction = 'down';
	this.idleTime = 0;
	this.lastUpdateTime = 0;
	this.relationshipManager;
  }
	
  set_intro(intro) {
	if (typeof intro === "string") this.intro = intro;
  }

  set_direction(direction) {
	if (BaseCharacter.validDirections.includes(direction)) 
	  if (this.direction !== direction) this.direction = direction;
  }	
};