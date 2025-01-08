// src/mechanisms/action/actionManager.js

class ActionManager {
	constructor(character) {
		this.character = character;
		this.actions = [];
	}
	
	registerAction(name, handler) {
		this.actions[name] = handler;
	}
	
	performAction(name, ...args) {
		if (this.actions[name]) {
			this.actions[name](this.player, ...args);
		} else {
			console.error(`Action ${name} is not registered.`);
		}
	}
};