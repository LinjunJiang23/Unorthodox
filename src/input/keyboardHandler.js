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
			press: {},
			release: {}
		};
		this.pressedKeys = new Set();
	}
	
	isKeyPressed(key) {
		return (this.pressedKeys.has(key));
	}
	
	onKeyPress(event) {
		 if (this.validKeys.has(event.code)) {
            this.pressedKeys.add(event.code);
            this.notifyListeners(event.code, "press");
        }
	}
	
	onKeyRelease(event) {
        if (this.validKeys.has(event.code)) {
            this.pressedKeys.delete(event.code);
            this.notifyListeners(event.code, "release");
        }
    }

    addListener(type, listener) {
        () => this.listeners[type].push(listener);
    }

    notifyListeners(key, type) {
        this.listeners[type].forEach((listener) => listener(key));
    }
	
};