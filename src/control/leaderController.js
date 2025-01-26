// src/control/leaderController.js


/**
 * Class that controlls the leader in the teams. 
 */
class LeaderController {
  constructor(eventManager, inputHandler, camera) {
	this.eventManager = eventManager;
	this.inputHandler = inputHandler;
	this.camera = camera;
	this.leader;
	this.movementController = new MovementController(this);
	this.stateController = new StateController(this);
	this.init_events();
  }
	
  update(lastUpdate, timestamp) {
	const deltaTime = Math.max((timestamp - lastUpdate) / 1000, 0.001);
	this.control_movement(deltaTime);
	this.control_state(deltaTime);
  }
	
  control_on_press_kb_input(key) {
	this.movementController.handle_input('press', key);
	//this.stateController.handle_input('press', key);
  }
  
  control_on_release_kb_input(key) {
	this.movementController.handle_input('release', key);
	//this.stateController.handle_input('release', key);
  }
	
  control_state(deltaTime) {
	//this.stateController.control_state(deltaTime);
  }
  
  control_movement(deltaTime) {
	this.movementController.update(deltaTime);
  }
	
  change_leader(character) {
	//if (leader exists in team) continue to change, 
	//but this logic should be checked prior inside the team manager instead of having the controller check for it
	this.leader = character;
  }
  
  init_events() {
	this.inputHandler.add_keyboard_handler('press', (key) => this.control_on_press_kb_input(key));
	this.inputHandler.add_keyboard_handler('release', (key) => this.control_on_release_kb_input(key));	
	this.eventManager.on('switchLeaderControl', (payload) => {
	  const { character } = payload;
	  this.leader = character;
	});
  }
};