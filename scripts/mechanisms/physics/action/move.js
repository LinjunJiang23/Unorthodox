// scripts/mechanisms/physics/action/move.js

let playerPosition = {x: 0, y: 0};

function movePlayer(direction, speed = 1) {
      let newX = playerPosition.x;
      let newY = playerPosition.y;
	  
	  let cameraPos = camera.getPosition();

	  playerAnimation.direction = direction;
	  playerAnimation.isMoving = true;
	  playerAnimation.isIdle = false;
	  playerAnimation.animationSpeed = 140;
	  playerAnimation.currentState= "walk";

      if (direction === 'up') {
		  if (cameraPos.y > playerPosition.y) {
			  
		  } 
		  else {
		    camera.moveCameraTo(0, -16);
		    playerPosition.y >= 1 ? newY -= 16 : newY = playerPosition.y;
		  }
	  } else if (direction === 'down') {
		  if (cameraPos.y > playerPosition.y) {
			  playerPosition.y >= 0 ? newY += 16 : newY = playerPosition.y;
		  } else {
			camera.moveCameraTo(0, 16);
			playerPosition.y >= 0 ? newY += 16 : newY = playerPosition.y;
		  }
	  } else if (direction === 'left') {
		  camera.moveCameraTo(-16, 0);
		  playerPosition.x >= 1 ? newX -= 16 : newX = playerPosition.x;
	  } else if (direction === 'right') {
		  camera.moveCameraTo(16, 0);
		  playerPosition.x >= 0 ? newX += 16 : newX = playerPosition.x;
	  }
	  
	  playerPosition.x = newX;
	  playerPosition.y = newY;
	  
	  envManager.renderEnvironment('testLayer');
};

// Keyboard Event Listener
document.addEventListener('keydown', (event) => {
      let speed = 1;
	  if (event.shiftKey) console.log('Shift key was holding! Should implement running and other functionality later.');
	  
	  if (event.key === "W" || event.key === "w") {
          event.preventDefault();
          movePlayer('up');
      } else if (event.key === "S" || event.key === "s") {
          event.preventDefault();
          movePlayer('down');
      } else if (event.key === "A" || event.key === "a") {
          event.preventDefault();
          movePlayer('left');
      } else if (event.key === 'd' || event.key === "D") {
          event.preventDefault();
          movePlayer('right');
      }
});

document.addEventListener('keyup', (event) => {
	if (event.key === "W" || event.key === "w" || 
		event.key === "S" || event.key === "s" || event.key === "A" || 
		event.key === "a" || event.key === 'd' || event.key === "D") {
		playerAnimation.stop();
	}
});