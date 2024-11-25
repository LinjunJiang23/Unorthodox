// scripts/utils/gameLoop.js

let isPaused = true;


/**
 * gameLoop - base logic for game play
 */
function gameLoop(timestamp) {
  //Time progresses
  if (!isPaused) {
	const deltaTime = (timestamp - lastUpdate) / 1000;
	updateGameTime(timestamp);
	playerAnimation.updateAnimation(timestamp);
	handleKeyboardControl(deltaTime);
  } else {
	
  }
  requestAnimationFrame(gameLoop);
}

requestAnimationFrame(gameLoop);