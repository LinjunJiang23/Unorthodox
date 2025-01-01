// src/engine/input/inputHandler.js

class InputHandler {
	constructor(engine) {
		if (engine instanceof Engine)
			this.engine = engine;
			this.kbHandler = new KeyboardHandler(this);
			this.mouseHandler = new MouseHandler(this);
			
	}
	
	handle_input(event) {
        if (event.type === "keydown" || event.type === "keyup") {
            this.kbHandler[event.type === "keydown" ? "onKeyPress" : "onKeyRelease"](event);
        }
		
		if (event.type === "click") {
			this.mouseHandler.onMouseClick(event);
		}
    }
	
	
};