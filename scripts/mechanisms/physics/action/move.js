// scripts/mechanisms/physics/action/move.js
let playerPosition = { x: 0, y: 0 };

class PlayerIcon {
	constructor() {
		this.position = { x : 0, y : 0};
		this.state = 'idle';
		this.isMoving = false;
		this.currentFrame = 0;
		this.animationSpeed = 100;
		this.lastUpdateTime = 0;
		this.animationSpriteSheets = {
			idle: [],
			up: [],
			down: [],
			left: [],
			right: [],
			normal_attack: [] 
		};
	}
	
	updateAnimation(timestamp) {
		if (!this.isMoving) {
			this.currentFrame = 
		}
	}
};


function movePlayer(direction, speed) {
      let newX = playerPosition.x;
      let newY = playerPosition.y;
	  
	  let cameraPos = camera.getPosition();

      if (direction === 'up') {
		  camera.moveCameraTo(0, -16);
		  playerPosition.y >= 1 ? newY -= 1 : newY = playerPosition.y;
	  } else if (direction === 'down') {
		  camera.moveCameraTo(0, 16);
		  playerPosition.y >= 0 ? newY += 1 : newY = playerPosition.y;
	  } else if (direction === 'left') {
		  camera.moveCameraTo(-16, 0);
		  playerPosition.x >= 1 ? newX -= 1 : newX = playerPosition.x;
	  } else if (direction === 'right') {
		  camera.moveCameraTo(16, 0);
		  playerPosition.x >= 0 ? newX += 1 : newX = playerPosition.x;
	  }
	  
	  playerPosition.x = newX;
	  playerPosition.y = newY;
	  
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