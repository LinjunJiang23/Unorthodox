// scripts/mechanisms/action/leader/move.js

/**
 * Control leader to walk
 * @param {Object} leader
 * @param {number} dx
 * @param {number} dy
 * @param {number} timestamp 
 */
function walkLeader(leader, dx, dy, timestamp) {
      const deltaTime = Math.max((timestamp - lastUpdate) / 1000, 0.001);
	  const step = 10 * deltaTime;
	  const currentPos = leader.get_position();
	  const leaderModel = getModel(leader);
	  let newX = currentPos.x + (step * dx);
      let newY = currentPos.y + (step * dy);
	  
	  const direction = getDirection(dx, dy);
	  
	  console.log(direction);
	  
	  if (newX < 0) newX = 0;
	  if (newY < 0) newY = 0;
	  
	  
	  
	  triggerManager.checkCollisionsInView(leaderModel.physics, leader);

	  const isBlocked = CollisionManager.checkCollisionInActiveSections({
		  x: newX, y: newY, 
		  width: leaderModel.physics.width, height: leaderModel.physics.height});
	  
	  if (!isBlocked) {
		leaderModel.set_direction(direction);
		leaderModel.set_state('walk');
		leaderModel.update_animation(timestamp);
		leaderModel.physics.x = newX;
		leaderModel.physics.y = newY;
		camera.centerCameraOn(leaderModel.physics);
	  } else {
		/** @todo Add collision reaction*/
		leaderModel.set_direction(direction);
		leaderModel.set_state('idle');
		leaderModel.update_animation(timestamp);
	  }
};