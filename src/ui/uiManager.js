// src/ui/uiManager.js

class UIManager {
  constructor(eventManager, inputHandler) {
	this.eventManager = eventManager;
	this.inputHandler = inputHandler;
	this.uiElements = uiElements;
	this.startScreenMenu = new StartScreenMenu(this.eventManager, this.inputHandler);
	this.textProcessor = new TextProcessor(this);
	this.init_listeners();
	this.eventManager.trigger('initStartscreen', {});
  }
	
  show_UI(keys) {
	const current = this.get_UI(keys);
	if (current instanceof HTMLElement) {
	  current.style.display = "block";
	} else if (current && typeof current === "object") {
	  Object.values(current).forEach(ele => {
		if (ele instanceof HTMLElement && ele.style.display !== "block") 
		  ele.style.display = "block";
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
	    if (ele instanceof HTMLElement && ele.style.display !== "none") ele.style.display = "none";
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
	this.generic_events();
	this.textProcessor_events();
	this.ui_events();
  }
  
  generic_events() {
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
  
  ui_events() {
	this.eventManager.on('initStartscreen', (payload) => this.uiElements.lazyloadStartscreen());
	this.eventManager.on('initGameUI', (payload) => this.uiElements.lazyloadGameUI());
    this.eventManager.on('initDialogueUI', (payload) => this.uiElements.lazyloadDialogueContainer());
	this.eventManager.on('startNewGame', (payload) => {
	  this.uiElements.lazyloadGameUI();
	  this.hide_UI(['startscreen']);
	  this.show_UI(['gameUI', 'gameEnv']);
	});
  }
  
  textProcessor_events() {
    this.eventManager.on('processText', (payload) => {
	  const ele = this.get_UI(payload.uiArray);
	  if (!ele) this.eventManager.trigger('error', { type: 'nullReturn', 
	    message: 'UI with component name is not found! ', context: { ui: ele } });
	  this.textProcessor.processText(payload.textObject, ele);
	});
	this.eventManager.on('onTextTyping', (payload) => {
	  const isTyping = this.textProcessor.isTyping;
	  const str = this.textProcessor.str;
	  if (payload.cb) payload.cb(isTyping, str);
	});
	this.eventManager.on('finishTextTyping', (payload) => {
	  const ele = this.get_UI(payload.uiArray);
	  this.textProcessor.finishType(ele);
	});
	this.eventManager.on('clearText', (payload) => {
	  const ele = this.get_UI(payload.uiArray);
	  if (!ele) this.eventManager.trigger('error', { type: 'nullReturn', 
	    message: 'UI with component name is not found! ', context: { ui: ele } });
	  if (Array.isArray(ele)) {
	    ele.forEach(e => e.textContent = '');
	  } else {
	  	ele.textContent = '';
	  }
	});
	this.eventManager.on('displayPlainText', (payload) => {
	  const ele = this.get_UI(payload.uiArray);
	  if (!ele) this.eventManager.trigger('error', { type: 'nullReturn', 
	    message: 'UI with component name is not found! ', context: { ui: ele } });
	  if (Array.isArray(ele)) {
	    ele.forEach(e => this.textProcessor.displayPlainText(payload.textObject, e));
	  } else {
	    this.textProcessor.displayPlainText(payload.textObject, ele);
	  }
	});
  }
};