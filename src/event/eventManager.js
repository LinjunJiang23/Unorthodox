// src/event/eventManager.js

/** 
 * For subscribing to, 
 * unsubscribing from, and triggering events
 * @property {Object} listeners
 */
class EventManager {
  constructor(logic) {
	this.logic = logic;
	this.listeners = {};
  }
	
  on(e, callback) {
	if (!this.listeners[e]) {
	  this.listeners[e] = [];
	}
    this.listeners[e].push(callback);
  }
	
  off(e, callback) {
	if (this.listeners[e]) {
	  this.listeners[e] = this.listeners[e].filter(cb => cb !== callback);
	}
  }
	
  trigger(e, payload) {
	if (this.listeners[e]) {
	  this.listeners[e].forEach(callback => callback(payload));
	}
  }
	
  show_all_events() {
	console.log("Current registered events: ", this.listeners);
  }
};