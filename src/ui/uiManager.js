// src/ui/uiManager.js

class UIManager {
	constructor(engine) {
		this.engine = engine;
		this.uiElements = uiElements;
		this.startScreenMenu = new StartScreenMenu(this);
		//... add other ui panels here
	}
	
	init() {
		myPromise.then(() => this.uiElements.lazyloadStartscreen())
		.then(() => this.startScreenMenu.initialize_listeners())
		.then(() => this.uiElements.lazyloadGameUI());
	}
	
	start_gameEnv() {
		myPromise
		.then(() => this.uiElements.lazyloadGameUI())
		.then(() => {
			this.hide_UI('startscreen');
			this.show_UI('gameUI', 'gameEnv');
		});
	}
	
	show_UI(...keys) {
		const current = this.get_UI(...keys);
		if (current instanceof HTMLElement) {
			current.style.display = "block";
		} else if (typeof current === "object") {
			Object.values(current).forEach(ele => {
				if (ele instanceof HTMLElement) {
					ele.style.display = "block";
				}
			});
		} else {
			console.warn('No valid UI elements found at the final key');
		}
	}
	
	hide_UI(keys) {
		const current = this.get_UI(keys);
		if (current instanceof HTMLElement) {
			current.style.display = "none";
		} else if (typeof current === "object") {
			Object.values(current).forEach(ele => {
				if (ele instanceof HTMLElement) {
					ele.style.display = "none";
				}
			});
		} else {
			console.warn('No valid UI elements found at the final key');
		}
	}
	
	update_UI(elementName, callback) {
		callback(this.uiElements[elementName]);
	}
	
	get_UI(...keys) {
		let current = this.uiElements;
    
		// Traverse the keys step by step
		for (let key of keys) {
			if (current[key]) {
				current = current[key];
			} else {
				console.warn(`Key "${key}" not found in uiElements.`);
				return; // Exit if a key is invalid
			}
		}
		
		return current;
	}
	
	addButtonListeners(divs, callbacks) {
        Object.entries(divs).forEach(([key, div]) => {
            div.addEventListener("click", callbacks[key]);
        });
    }
};

// Start Screen Button Callbacks
// uiManager.addButtonListeners(uiManager.uiElements.startScreen.buttons, {
    // startGame: () => console.log("Starting game..."),
    // loadGame: () => console.log("Loading game..."),
    // ...
// });