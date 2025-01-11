// src/engine/input/inputHandler.js

class InputHandler {
  constructor(engine) {
	this.kbHandler = new KeyboardHandler(this);
	this.mouseHandler = new MouseHandler(this);
	this.init();
  }
  
  init() {
    window.addEventListener("keydown", (event) => this.handle_input(event));
	window.addEventListener("keyup", (event) => this.handle_input(event));
	window.addEventListener('click', (event) => this.handle_input(event));
  }
	
  handle_input(event) {
    if (event.type === "keydown" || event.type === "keyup") {
      this.kbHandler[event.type === "keydown" ? "on_key_press" : "on_key_release"](event);
	}
		
	if (event.type === "click") {
	  this.mouseHandler.on_mouse_click(event);
	}
  }
  
  add_mouse_handler({ type, key, listener }) {
	this.mouseHandler.add_listener(type, key, listener);
	console.log(`This type ${type} key ${key} has listener ${listener} registered`);
  }
  
  add_keyboard_handler({type, listener}) {
    this.kbHandler.add_listener(type, listener);
  }
};