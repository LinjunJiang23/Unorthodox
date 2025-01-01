// src/event/eventManager.js

/** 
 * For subscribing to, 
 * unsubscribing from, and triggering events
 * @property {Object} listeners
 */
class EventManager {
	constructor() {
		this.listeners = {
		};
	}
	
	on(event, callback) {
		if (!this.listeners[event]) {
			this.listeners[event] = [];
		}
		this.listeners[event].push(callback);
	}
	
	off(event, callback) {
		if (this.listeners[event]) {
			this.listeners[event] = this.listeners[event].filter(cb => cb !== callback);
		}
	}
	
	trigger(event, payload) {
		if (this.listeners[event]) {
			this.listners[event].forEach(callback => callback(payload));
		}
	}
	
	show_all_events() {
		console.log("Current registered events: ", this.listeners);
	}
};