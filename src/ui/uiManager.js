// src/ui/uiManager.js

class UIManager {
	constructor() {
		this.uiElements = uiElements;
		this.startScreenMenu = new StartScreenMenu(this);
		//... add other ui panels here
	}
	
	show_UI(...keys) {
		const current = this.get_UI(...keys);
		if (current instanceof HTMLElement) {
			current.style.transition = 'opacity 0.5s';
			current.style.opacity = 1;
			current.style.display = "block";
		} else if (typeof current === "object") {
			Object.values(current).forEach(ele => {
				if (ele instanceof HTMLElment) {
					ele.style.transition = 'opacity 0.5s';
					ele.style.opacity = 1;
					ele.style.display = "block";
				}
			});
		} else {
			console.warn('No valid UI elements found at the final key');
		}
	}
	
	hide_UI(key) {
		const current = this.get_UI(keys);
		if (current instanceof HTMLElement) {
			current.style.display = "none";
		} else if (typeof current === "object") {
			Object.values(current).forEach(ele => {
				if (ele instanceof HTMLElment) {
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