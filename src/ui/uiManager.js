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
			this.hide_UI(['startscreen']);
			this.show_UI(['gameUI', 'gameEnv']);
		})
		.then(() => this.init_listeners());
	}
	
	show_UI(keys) {
		const current = this.get_UI(keys);
		if (current instanceof HTMLElement) {
			current.style.display = "block";
		} else if (current && typeof current === "object") {
			Object.values(current).forEach(ele => {
				if (ele instanceof HTMLElement && ele.style.display !== "block") {
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
				if (ele instanceof HTMLElement && ele.style.display !== "none") {
					ele.style.display = "none";
				}
			});
		} else {
			console.warn('No valid UI elements found at the final key');
		}
	}
	
	
	get_UI(keys) {
		if (!this.uiElements) {
			console.error('uiElements is not initialized or is null.');
			return null;
		}

		let current = this.uiElements;

		for (let key of keys) {
			if (current[key]) {
				current = current[key];
			} else {
				console.warn(`Key "${key}" not found in uiElements.`);
				return null; // Return null if a key is invalid
			}
		}
		return current;
	}


	
	eleOnShow(keys) {
		const ele = this.get_UI(keys);
		if (ele)
		return (ele.display !== "none") ? true : false;
	}
	
  update_UI(keys, callback) {
	const current = this.get_UI(keys);
	callback(current);
  }
	
  init_listeners() {
	this.eventManager = this.engine.logic.eventManager;
	this.eventManager.on('showUI', (payload) => {
	  this.show_UI(payload.uiArray);
	});
	this.eventManager.on('hideUI', (payload) => {
	  this.hide_UI(payload.uiArray);
	});
	this.eventManager.on('updateUI', (payload) => {
	  this.update_UI(payload.uiArray, payload.cb);
	});
  }
};