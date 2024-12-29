// src/mechanisms/action/leader/runLeader.js

function runLeader(leader, dx, dy, timestamp) {
	const deltaTime = Math.max((timestamp - lastUpdate / 1000, 0.001));
	const step = 40 * deltaTime;
	const currentPos = leader.get_position();
	const leaderModel = getModel(leader);
	let newX = currentPos.x + (dx * step);
    let newY = currentPos.y + (dy * step);
	  
	const direction = getDirection(dx, dy);

	if (newX < 0) newX = 0;
	if (newY < 0) newY = 0;
	  
	triggerManager.checkCollisionsInView(leaderModel.physics, leader);

	const isBlocked = CollisionManager.checkCollisionInActiveSections({
		x: newX, 
		y: newY, 
		width: leaderModel.physics.width, 
		height: leaderModel.physics.height});
	  
	if (!isBlocked) {
		leaderModel.set_direction(direction);
		leaderModel.set_state('run');
		leaderModel.update_animation(timestamp);
		leaderModel.physics.x = newX;
		leaderModel.physics.y = newY;
		camera.centerCameraOn(leaderModel.physics);
	} else {
		/** @todo Should have collision reaction to running
		 * WHEN RUNNING INTO CERTAIN COLLISION LIKE WALL 1 HP
		 */
		leaderModel.set_direction(direction);
		leaderModel.set_state('idle');
		leaderModel.update_animation(timestamp);
	}
	
};