// scripts/mechanisms/physics/action/move.js
let playerPosition = { x: 0, y: 0 };


function movePlayer(direction, speed) {
      let newX = playerPosition.x;
      let newY = playerPosition.y;
	  
	  let cameraPos = camera.getPosition();

      if (direction === 'up') {
		  camera.moveCameraTo(0, 16);
		  newY -= 1;
	  } else if (direction === 'down') {
		  camera.moveCameraTo(0, -16);
		  newY += 1;
	  } else if (direction === 'left') {
		  camera.moveCameraTo(-16, 0);
		  newX -= 1;
	  } else if (direction === 'right') {
		  camera.moveCameraTo(16, 0);
		  newX += 1;
	  }
	  
	  envManager.renderEnvironment('testLayer');
};

// Keyboard Event Listener
document.addEventListener('keydown', (event) => {
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