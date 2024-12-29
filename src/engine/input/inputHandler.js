// src/engine/input/inputHandler.js

class InputHandler {
	constructor(engine) {
		if (engine instanceof Engine)
			this.engine = engine;
		this.pressedKeys = new Set();
	}
	
	handle_kb_control(timestamp) {
		handleKBMove(this.pressedKeys, timestamp);
		
	}
	
	handle_mouse_control(timestamp) {
		
	}
	
	add_keys(keys) {
		keys.forEach(key =>
			this.pressedKeys.add(key));
	}
	
	remove_keys(keys) {
		keys.forEach(key => {
			if (this.pressedKeys.has(key)) 
				this.pressedKeys.delete(key);
		});
	}
	
	
};