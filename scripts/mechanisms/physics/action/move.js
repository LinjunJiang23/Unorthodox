// scripts/mechanisms/physics/action/move.js

function movePlayer(direction) {
      let newX = playerPosition.x;
      let newY = playerPosition.y;

      if (direction === 'up') newY -= 1;
      if (direction === 'down') newY += 1;
      if (direction === 'left') newX -= 1;
      if (direction === 'right') newX += 1;

      // Check if new position is within bounds and walkable
      if (newY >= 0 && newY < map.length && newX >= 0 && newX < map[0].length && map[newY][newX] === 1) {
        playerPosition = { x: newX, y: newY };
        console.log(`Player moved to (${newX}, ${newY})`);
      } else {
        console.log('Blocked!');
      }

      renderEnvironment(); // Update map after move
}

// Keyboard Event Listener
document.addEventListener('keydown', (event) => {
      switch (event.key) {
        case 'ArrowUp':
              event.preventDefault();

          movePlayer('up');
          break;
        case 'ArrowDown':
              event.preventDefault();

          movePlayer('down');
          break;
        case 'ArrowLeft':
              event.preventDefault();

          movePlayer('left');
          break;
        case 'ArrowRight':
              event.preventDefault();

          movePlayer('right');
          break;
        default:
          break;
      }
  });