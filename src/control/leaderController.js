// src/control/leaderController.js


/**
 * Class that controlls the leader in the teams. 
 */
class LeaderController {
  constructor(eventManager, inputHandler) {
	this.eventManager = eventManager;
	this.inputHandler = inputHandler;
	this.leader = this.logic.characters.player.player;
	
	this.inputHandler.add_kb_listener('press', (key) => this.control_on_press_kb_input(key));
		
	this.movementController = new MovementController(this);
	this.stateController = new StateController(this);
  }
	
  update(timestamp) {
	this.control_movement(timestamp);
	this.control_state(timestamp);
  }
	
  control_on_press_kb_input(key) {
	if (key === "KeyA" || key === "KeyD" || key === "KeyS" || key === "KeyW") 
	  this.movementController.handle_movement_input(key);
  }
	
  control_movement(timestamp) {
	const deltaTime = Math.max((timestamp - this.logic.engine.lastUpdate) / 1000, 0.001);

	const dx = (this.inputHandler.isKeyPressed("KeyA") ? -1 : 0) +
					(this.inputHandler.isKeyPressed('KeyD') ? 1 : 0);
	const dy = (this.inputHandler.isKeyPressed("KeyW") ? -1 : 0) +
					(this.inputHandler.isKeyPressed('KeyS') ? 1 : 0);
	if ((dx !== 0 || dy !== 0 ) && 
	!(this.inputHandler.isKeyPressed("KeyA") && this.inputHandler.isKeyPressed("KeyD")) &&
	!(this.inputHandler.isKeyPressed('KeyW') && this.inputHandler.isKeyPressed('KeyS'))) {
	  const isRunning = this.inputHandler.isKeyPressed('ShiftLeft') || this.inputHandler.isKeyPressed('ShiftRight');
		this.movementController.handle_movement(dx, dy, isRunning, deltaTime);
	} else {
	  this.leader.set_state("idle");
	  this.leader.model.animation.change_current_animation(this.leader.mode, 'idle', this.leader.direction);
	}
  }
	
  control_state(timestamp) {
	this.stateController.control_state(timestamp);
  }
	
  change_leader(character) {
	//if (leader exists in team) continue to change:
	this.leader = character;
  }
};