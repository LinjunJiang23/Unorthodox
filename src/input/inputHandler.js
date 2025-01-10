// src/engine/input/inputHandler.js

class InputHandler {
  constructor(engine) {
	if (engine instanceof Engine)
	  this.engine = engine;
	  this.kbHandler = new KeyboardHandler(this);
	  this.mouseHandler = new MouseHandler(this);
  }
  
  init() {
    window.addEventListener("keydown", (event) => this.inputHandler.handle_input(event));
	window.addEventListener("keyup", (event) => this.inputHandler.handle_input(event));
	window.addEventListener('click', (event) => this.inputHandler.handle_input(event));
  }
	
  handle_input(event) {
    if (event.type === "keydown" || event.type === "keyup") {
      this.kbHandler[event.type === "keydown" ? "onKeyPress" : "onKeyRelease"](event);
	}
		
	if (event.type === "click") {
	  this.mouseHandler.onMouseClick(event);
	}
  }
  
  add_mouse_handler({}) {
  }
  
  add_keyboard_handler({}) {
  }
};