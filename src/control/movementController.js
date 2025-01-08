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
	}
	
	handle_movement(dx, dy, isRunning, deltaTime) {
		isRunning ? this.run(dx, dy, deltaTime) : this.walk(dx, dy, deltaTime);
	}
	
	walk(dx, dy, deltaTime) {
		const step = 10 * deltaTime;
		const leader = this.leaderController.leader;
		const currentPos = this.leaderController.leader.get_position();
		let newX = currentPos.x + (step * dx);
		let newY = currentPos.y + (step * dy);
	  
		const direction = getDirection(dx, dy);
	  
		if (newX < 0) newX = 0;
		if (newY < 0) newY = 0;
		let isBlocked = false;
	  
		if (!isBlocked) {
			this.update_position(newX, newY, direction, 'walk');
		} else {
			/** @todo Add collision reaction*/
			leader.set_direction(direction);
			leader.set_state('idle');
			leader.model.animation.change_current_animation(leader.mode, 'idle', direction);
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
		leader.model.physics.x = newX;
		leader.model.physics.y = newY;
		leader.model.animation.change_current_animation(leader.mode, type, direction);
		const newScreenPos = this.leaderController.logic.engine.camera.map_to_screen({x: newX, y: newY});
		leader.model.animation.change_position(newScreenPos.x, newScreenPos.y);
		this.leaderController.logic.engine.camera.follow_character(leader);
	
	}
	
	handle_collision() {
		/** @todo Should have collision reaction to running
			 * WHEN RUNNING INTO CERTAIN COLLISION LIKE WALL take 1 HP damage
			 */
			leader.set_direction(direction);
			leader.set_state('idle');
	}
	
}	