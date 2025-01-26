// scripts/engine/control/keyboardHandler.js


/**
 * @class
 * Track which keys are pressed or released. Expose these states or events to 
 * higher-level systems, like a PlayerController or GameLogic class.
 * Let other systems (e.g., movement handling, animations) subscribe to keypress events 
 * or query key state. 
 */
class KeyboardHandler {
  constructor(inputHandler) {
	this.inputHandler = inputHandler;
	this.listeners = {
	  press: [],
	  release: []
	};
	this.pressedKeys = new Set();
	window.addEventListener("keydown", (event) => this.on_key_press(event));
	window.addEventListener("keyup", (event) => this.on_key_release(event));
  }
	
  is_key_pressed(key) {
	return (this.pressedKeys.has(key));
  }
	
  on_key_press(event) {
    this.pressedKeys.add(event.code);
    this.notify_listeners(event.code, "press");
  }
	
  on_key_release(event) {
    this.pressedKeys.delete(event.code);
    this.notify_listeners(event.code, "release");
  }

  add_listener(type, listener) {
	console.log('The type being registered', type);
	console.log("Adding kb listeners: ", listener);
    this.listeners[type].push(listener);
  }

  notify_listeners(key, type) {
    this.listeners[type].forEach((listener) => listener(key));
  }
};