// src/engine/input/inputHandler.js

class InputHandler {
  constructor(engine) {
	this.kbHandler = new KeyboardHandler(this);
	this.mouseHandler = new MouseHandler(this);
  }
	
  handle_input(event) {
    if (event.type === "keydown" || event.type === "keyup") {
      this.kbHandler[event.type === "keydown" ? "on_key_press" : "on_key_release"](event);
	}
		
	if (event.type === "click") {
	  this.mouseHandler.on_mouse_click(event);
	}
  }
  
  add_mouse_handler(type, key, listener) {
	this.mouseHandler.add_listener(type, key, listener);
  }
  
  add_keyboard_handler(type, listener) {
    this.kbHandler.add_listener(type, listener);
  }
  
  is_key_pressed(key) {
    return this.kbHandler.is_key_pressed(key);
  }
};