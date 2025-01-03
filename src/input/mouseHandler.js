// src/input/mouseHandler.js

class MouseHandler {
	constructor(inputHandler) {
		this.inputHandler = inputHandler;
		this.listeners = {
			click: {},
			hover: {},
			move: {}
		};
	}
	
	onMouseClick(event) {
		const ele = event.target;
		console.log("This is the mouse click target: ", ele);
		console.log("This is the event: ", event);
		const key = ele.id || ele.className;

		if (this.listeners.click[key]) 
			this.notifyListeners('click', key);
	}
	
	onMouseHover(event) {
		const ele = event.target;
		if (this.listeners.hover[ele]) 
			this.notifyListeners('hover', ele);
	}
	
	onMouseMove(event) {
		const ele = event.target;
		if (this.listeners.move[ele])
			this.notifyListeners('hover', ele);
	}
	
	addListeners(type, key, listener) {
		if (!this.listeners[type][key] && this.listeners[type]) {
			this.listeners[type][key] = [];  // Initialize the array for this element if not already initialized
		}
		this.listeners[type][key].push(listener);
	}
	
	removeListeners(type, key, listener) {
		if (this.listeners[type][key]) {
			this.listeners[type][key] = this.listeners[key].filter(listener => listener !== listener);
		}
	}
	
	notifyListeners(type, ele) {
		this.listeners[type][ele].forEach(callback => callback());
	}
	
	show_all_events() {
		console.log("Current registered events: ", this.listeners);
	}
};
