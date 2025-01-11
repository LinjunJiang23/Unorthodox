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
	
  on_mouse_click(event) {
	const ele = event.target;
	 console.log("This is the mouse click target: ", ele);
	// console.log("This is the event: ", event);
	const key = ele.id || ele.className;

	if (this.listeners.click[key]) 
	  this.notify_listeners('click', key);
  }
	
  on_mouse_hover(event) {
	const ele = event.target;
	if (this.listeners.hover[ele]) 
	  this.notify_listeners('hover', ele);
  }
	
  on_mouse_move(event) {
	const ele = event.target;
	if (this.listeners.move[ele])
	  this.notify_listeners('hover', ele);
  }
	
  add_listener(type, key, listener) {
	if (!this.listeners[type][key] && this.listeners[type]) {
	  this.listeners[type][key] = [];  // Initialize the array for this element if not already initialized
	}
	this.listeners[type][key].push(listener);
  }
	
  remove_listener(type, key, listener) {
	if (this.listeners[type][key]) {
	  this.listeners[type][key] = this.listeners[key].filter(listener => listener !== listener);
	}
  }
	
  notify_listeners(type, ele) {
	this.listeners[type][ele].forEach(callback => callback());
  }
	
  show_all_events() {
	console.log("Current registered events: ", this.listeners);
  }
};
