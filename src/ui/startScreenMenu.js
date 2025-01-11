// src/ui/startScreenMenu.js

class StartScreenMenu {
  constructor(eventManager, inputHandler) {
	this.eventManager = eventManager;
	this.inputHandler = inputHandler;
	this.initialize_listeners();
  }
	
  initialize_listeners() {
	console.log("Reached here!");
	this.setup_startgame_listeners();
  }
	
  setup_animation_listeners() {
  }
	
  setup_startgame_listeners() {
	this.inputHandler.add_mouse_handler({ type: 'click', 
	  key: 'startscreen-startgame', listener: () => this.start_game()});
  }
	
  animation() {
  }
	
  start_game() {
	this.eventManager.trigger('startNewGame', {});
  }
	
  load_game() {
	//this.saveSystem.show_load();
  }
	
  open_settings() {
	//this.settings.show_settings();
  }
	
  quit_game() {
	//this.engine.quit_game();
  }
	
};