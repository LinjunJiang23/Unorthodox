// scripts/mechanisms/gamePlay/gameLoop.js


/**
 * gameLoop - base logic for game play
 */
function gameLoop(timestamp) {
    playerAnimation.updateAnimation(timestamp);
    
	
	requestAnimationFrame(gameLoop);
}

requestAnimationFrame(gameLoop);