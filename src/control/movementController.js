// src/control/movementHandler.js

/**
 * Control leader to walk
 * @param {Object} leader
 * @param {number} dx
 * @param {number} dy
 * @param {number} timestamp 
 */
class MovementController {
  constructor(leaderController) {
	this.leaderController = leaderController;
	this.dx = 0;
	this.dy = 0;
	this.isRunning = false;
	this.isHalted = false;
  }
  
  update(deltaTime) {
	this.handle_movement(deltaTime);
  }
  
  handle_input(type, key) {
	const inputHandler = this.leaderController.inputHandler;
	if (key === "KeyA" || key === "KeyW" || key === "KeyD" || key === "KeyS") {
	  if ((inputHandler.is_key_pressed("KeyA") && inputHandler.is_key_pressed("KeyD")) || 
	     (inputHandler.is_key_pressed('KeyW') && inputHandler.is_key_pressed('KeyS'))) {
	    this.halt_movement();
		return;
	  }
	  this.isRunning = 
	    (inputHandler.is_key_pressed('ShiftRight') || inputHandler.is_key_pressed('ShiftLeft')) ? true : false;
	  this.dx = (inputHandler.is_key_pressed("KeyA") ? -1 : 0) + (inputHandler.is_key_pressed('KeyD') ? 1 : 0);
	  this.dy = (inputHandler.is_key_pressed("KeyW") ? -1 : 0) + (inputHandler.is_key_pressed('KeyS') ? 1 : 0); 
	  if (this.dx === 0 && this.dy === 0) {
		this.halt_movement();
		return;
	  }
	  this.isHalted = false;
	}
	
	if (type === "press") this.handle_press_input(key);
	if (type === "release") this.handle_release_input(key);
  }
  
  handle_press_input(key) {
	
  }
  
  handle_release_input(key) {
	
  }
  
  halt_movement() {
	this.isHalted = true;
	this.leaderController.leader.set_state('idle');
  }
  
  handle_movement(deltaTime) {
	if (!deltaTime || typeof deltaTIme !== "number") {
	  this.leaderController.eventManager.trigger('error', { type: 'param', 
	  message: "The PARAM for handle_movement in movementController is not right", context: { param: deltaTime } });
	  return;
	}
	if (isHalted) return;
	this.isRunning ? this.run(deltaTime) : this.walk(deltaTime);
  }
	
  walk(deltaTime) {
	const step = 10 * deltaTime;
	const leader = this.leaderController.leader;
	const currentPos = this.leaderController.leader.get_position();
	let newX = currentPos.x + (step * dx);
	let newY = currentPos.y + (step * dy);
	  
	const direction = getDirection(this.dx, this.dy);
	  
	if (newX < 0) newX = 0;
	if (newY < 0) newY = 0;
	let isBlocked = false;
	  
	if (!isBlocked) {
	  this.update_position(newX, newY, direction, 'walk');
	} else {
	  /** @todo Add collision reaction*/
	  
	}
  }
	
  run(dx, dy, deltaTime) {
	const step = 40 * deltaTime;
	const leader = this.leaderController.leader;
	const currentPos = leader.get_position();
	let newX = currentPos.x + (dx * step);
	let newY = currentPos.y + (dy * step);
		  
	const direction = getDirection(dx, dy);

	if (newX < 0) newX = 0;
	if (newY < 0) newY = 0;
		  		
	//const isBlocked = this.check_collisions(newX, newY, leader.model.physics, leader);
		
	let isBlocked = false;
	if (!isBlocked) {
	  this.update_position(newX, newY, direction, 'run');
	} else {
	  this.handle_collision();
	}
  }
	
  check_collisions(newX, newY, physics, leader) {
	const isBlocked = CollisionManager.checkCollisionInActiveSections({
	  x: newX, 
	  y: newY, 
	  width: leader.model.physics.width, 
	  height: leader.model.physics.height});
	return isBlocked;
  }
	
  update_position(newX, newY, direction, type) {
	const leader = this.leaderController.leader;
	leader.set_direction(direction);
	leader.set_state(type);
	this.eventManager.trigger('characterMoved', { 
	  bounds: {
		x: newX,
		y: newY,
		width: leader.model.physics.width,
		height: leader.model.physics.height
	  }, 
	  id: leader.id, 
	  tag: leader.tag });
	leader.change_physical_position(newX, newY);
	this.eventManager.trigger('mapToScreen', { newX: newX, newY: newY, cb: (convertedPos) => {
	  
	}});
	const newScreenPos = this.leaderController.logic.engine.camera.map_to_screen({ x: newX, y: newY });
	leader.model.animation.change_position(newScreenPos.x, newScreenPos.y);
	this.leaderController.logic.engine.camera.follow_character(leader);	
  }
	
  handle_collision() {
	/** @todo Should have collision reaction to running
	 * WHEN RUNNING INTO CERTAIN COLLISION LIKE WALL take 1 HP damage
	 */
	this.halt_movement();
  }
};	