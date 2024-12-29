// src/characters/baseCharacter.js

class BaseCharacter {
	constructor() {
		this.app;
		this.model;
		this.actions;
		this.tag;
		this.intro;
		this.inventory;
		this.stats;
	}
	
	set_intro(intro) {
		if (typeof intro === "string") this.intro = intro;
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
};