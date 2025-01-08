// src/characters/baseCharacter.js

class BaseCharacter {
	static validDirections = 
	  ['left', 'up', 'right', 'down', 'upleft', 
	   'upright', 'downleft', 'downright'];
	static validModes = 
	  ['normal', 'combat', 'stealth'];
	
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
		if (BaseCharacter.validDirections.includes(direction)) {
			if (this.direction !== direction) this.direction = direction;
		}
	}	
	
	get_intro() {
		return this.intro;
	}
	
	get_tag() {
		return this.tag;
	}
	
	get_stats() {
		return this.stats;
	}
	
	get_app() {
		return this.app;
	}
	
	get_inventory() {
		return this.inventory;
	}
	
	get_model() {
		return this.model;
	}
	
	get_actions() {
		return this.actions;
	}
	
	get_idleTime() {
		return this.idleTime;
	}
	
	get_currentFrame() {
		return this.currentFrame;
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
};