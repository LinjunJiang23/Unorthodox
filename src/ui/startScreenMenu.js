// src/ui/startScreenMenu.js

class StartScreenMenu {
  constructor(eventManager) {
	this.eventManager = eventManager;
  }
	
  initialize_listeners() {
	this.setup_startgame_listeners();
	//...
  }
	
  setup_animation_listeners() {
	//this.uiElements['animation'].addEventListener();
  }
	
  setup_startgame_listeners() {
	
	this.uiElements['startGame'].addEventListener('click', () => this.start_game());
  }
	
  animation() {
	const aElement = this.uiElements['animation'];
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