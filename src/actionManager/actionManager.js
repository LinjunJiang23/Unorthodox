// src/mechanisms/action/actionManager.js

class ActionManager {
  constructor(character) {
	this.character = character;
	this.actions = [];
  }
	
  register_action(name, handler) {
	this.actions[name] = handler;
  }
	
  perform_action(name, ...args) {
	if (this.actions[name]) {
	  this.actions[name](this.player, ...args);
	} else {
	  console.error(`Action ${name} is not registered.`);
	}
  }
};