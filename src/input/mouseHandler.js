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
		if (this.listeners.click[ele]) 
			this.notifyListeners('click', ele);
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
	
	addListeners(type, ele, listener) {
		if (!this.listeners[type][ele] && this.listeners[type]) {
			this.listeners[type][ele] = [];  // Initialize the array for this element if not already initialized
		}
		this.listeners[type][ele].push(listener);
	}
	
	removeListeners(type, ele, listener) {
		if (this.listeners[type][ele]) {
			this.listeners[type][ele] = this.listeners[ele].filter(listener => listener !== listener);
		}
	}
	
	notifyListeners(type, ele) {
		this.listeners[type][ele].forEach(callback => callback());
	}
	
	show_all_events() {
		console.log("Current registered events: ", this.listeners);
	}
};
