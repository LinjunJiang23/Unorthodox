// src/control/movementHandler.js

/**
 * Movement controller of leader of the current focused team
 * @property {Objectt} leaderController - parent of movementController, used to get leader 
 * @property {number} dx
 * @property {number} dy
 * @property {Boolean} isRunning
 * @property {Boolean} isHalted
 */
class MovementController {
  constructor(leaderController) {
	this.leaderController = leaderController;
	this.dx = 0;
	this.dy = 0;
	this.shiftPressed = false;
	this.isHalted = false;
  }
  
  update(deltaTime) {
	this.handle_movement(deltaTime);
  }
  
  /** 
   * For simple movement command, check the pressedKeys from InputHandler. 
   * Conflict keys like holding left and right command at the same time halts current state
   */
  handle_input(type, key) {
	const inputHandler = this.leaderController.inputHandler;
	this.shiftPressed = 
	    (inputHandler.is_key_pressed('ShiftRight') || inputHandler.is_key_pressed('ShiftLeft')) ? true : false;
	if (key === "KeyA" || key === "KeyW" || key === "KeyD" || key === "KeyS") {
	  if ((inputHandler.is_key_pressed("KeyA") && inputHandler.is_key_pressed("KeyD")) || 
		(inputHandler.is_key_pressed('KeyW') && inputHandler.is_key_pressed('KeyS'))) {
		this.halt_movement();
		return;
	  }
	  
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
   
  handle_movement(deltaTime) {
	if (!deltaTime) {
	  this.leaderController.eventManager.trigger('error', { type: 'param', 
	  message: "The PARAM for handle_movement in movementController is not right", context: { param: deltaTime } });
	  return;
	}
	if (this.isHalted) return;
	this.move(deltaTime);
  }
  
  /**
   * @param {number} deltaTime
   */
  move(deltaTime) {
	const leader = this.leaderController.leader;
	const movementType = this.shiftPressed ? 'run' : 'walk';
	const step =  leader.movementSpeed[leader.mode][movementType] * deltaTime;

	const currentPos = this.leaderController.leader.get_position();
	let newX = currentPos.x + (step * this.dx);
	let newY = currentPos.y + (step * this.dy);
	  
	const direction = getDirection(this.dx, this.dy);
	  
	if (newX < 0) newX = 0;
	if (newY < 0) newY = 0;
	const isBlocked = false;
	  
	// ** @todo check collision logic here */
	if (!isBlocked) {
	  this.update_position(newX, newY, direction, movementType);
	} else {
	  /** @todo Add more collision reaction*/
	  this.handle_collision();
	}
  }
	
  check_collisions(newX, newY, physics, leader) {
	const isBlocked = CollisionManager.checkCollisionInActiveSections({
	  x: newX, 
	  y: newY, 
	  width: leader.model.physics.width, 
	  height: leader.model.physics.height
	});
	return isBlocked;
  }
	
  update_position(newX, newY, direction, type) {
	const leader = this.leaderController.leader;
	leader.set_character_state(leader.mode, type, direction);
	leader.move(newX, newY);
	//When camera updates to be movable, this logic should change as well, as sometimes character is simply outside of the camera frame therefore may not need to be rendered at all
	const screenPos = this.leaderController.camera.map_to_screen({ x: newX, y: newY });
	leader.model.animation.change_position(screenPos.x, screenPos.y);
	
	//Camera sometimes do not follow controlled character automatically, but this functionality should be added later
	this.leaderController.camera.follow_character(leader);	
  }
	
  handle_collision() {
	/** @todo Should have collision reaction to running
	 * E.G. WHEN RUNNING INTO CERTAIN COLLISION LIKE WALL take 1 HP damage
	 */
	this.halt_movement();
  }
  
  halt_movement() {
	this.isRunning = false;
	this.isHalted = true;
	this.leaderController.leader.halt();
  }
};	
