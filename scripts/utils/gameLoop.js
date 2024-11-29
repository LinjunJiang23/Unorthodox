// scripts/utils/gameLoop.js

let isPaused = true;
let lastUpdate = performance.now();


/**
 * gameLoop - base logic for game play
 */
function gameLoop(timestamp) {
  //Time progresses
  if (!isPaused) {
	handleKeyboardControl(timestamp);
	updateGameTime(timestamp);
  } 
  requestAnimationFrame(gameLoop);
}

requestAnimationFrame(gameLoop);