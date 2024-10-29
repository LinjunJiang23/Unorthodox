const map = [
  [1, 1, 0, 0, 2], // Each number represents a tile type (1 = grass, 0 = water, 2 = rock)
  [1, 1, 1, 0, 2],
  [0, 0, 1, 1, 1],
  [2, 1, 1, 0, 0]
];


// Player starts at (0, 0)
let playerPosition = { x: 0, y: 0 };

function renderEnvironment() {
      const envDiv = document.getElementById("environment");
      envDiv.innerHTML = ''; // Clear the map first
      map.forEach((row, y) => {
        row.forEach((tile, x) => {
          const tileDiv = document.createElement("div");
          tileDiv.classList.add("tile");
          // Assign a class based on tile type
          if (tile === 1) tileDiv.classList.add("grass");
          if (tile === 0) tileDiv.classList.add("water");
          if (tile === 2) tileDiv.classList.add("rock");

          // Add the player icon if the tile is the player's position
          if (x === playerPosition.x && y === playerPosition.y) {
            tileDiv.textContent = "👤"; // Player icon
          }

          envDiv.appendChild(tileDiv);
        });
      });
}