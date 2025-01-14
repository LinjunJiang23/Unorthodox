// src/control/leaderController.js


/**
 * Class that controlls the leader in the teams. 
 */
class LeaderController {
  constructor(eventManager, inputHandler) {
	this.eventManager = eventManager;
	this.inputHandler = inputHandler;
	this.leader;
	this.eventManager.trigger('getPlayer', {cb: (player) => this.leader = player});
	this.movementController = new MovementController(this);
	this.stateController = new StateController(this);

	//Input listeners
	this.inputHandler.add_keyboard_handler('press', (key) => this.control_on_press_kb_input(key));
	this.inputHandler.add_keyboard_handler('release', (key) => this.control_on_release_kb_input(key));	
  }
	
  update(lastUpdate, timestamp) {
	const deltaTime = Math.max((timestamp - lastUpdate) / 1000, 0.001);
	this.movementController.update(deltaTime);
	this.control_state(deltaTime);
  }
	
  control_on_press_kb_input(key) {
	this.movementController.handle_input('pressed', key);
	this.stateController.handle_input('pressed', key);
  }
  
  control_on_release_kb_input(key) {
	this.movementController.handle_input('released', key);
	this.stateController.handle_input('released', key);
  }
	
  control_state(timestamp) {
	this.stateController.control_state(timestamp);
  }
	
  change_leader(character) {
	//if (leader exists in team) continue to change:
	this.leader = character;
  }
};