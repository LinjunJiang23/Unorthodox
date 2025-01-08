// src/control/leaderController.js

class LeaderController {
	constructor(logic) {
		this.logic = logic;
		this.leader = this.logic.characters.player.player;
		
		this.inputHandler = this.logic.engine.inputHandler.kbHandler;
		this.inputHandler.addListener((key, type) => this.controlKBInput(key, type));
		
		this.movementController = new MovementController(this);
		this.stateController = new StateController(this);
	}
	
	update(timestamp) {
		this.control_movement(timestamp);
		this.control_state(timestamp);
	}
	
	controlKBInput(key, type) {
		if (type === 'press') {
			
		} 
		if (type === "release") {
		} 
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