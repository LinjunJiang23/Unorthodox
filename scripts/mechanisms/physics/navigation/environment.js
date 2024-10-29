class EnvironmentManager {
	constructor() {
		this.env = {};
	}

	loadEnvironment(env) {
		fetch("./json/environment/testLayer.tmj")
		.then(response => {
		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}
		this.env = response.json();
	})
		.then(data => {
		// 'data' is the parsed JSON object from the TMJ file.
		console.log(data);

		// Access layers, tile data, or map properties here
		const mapWidth = data.width;
		const mapHeight = data.height;
		const _layers = data.layers;

		// Example: Iterate through a layer
		_layers.forEach(_layer => {
		  if (_layer.type === "tilelayer") {
			console.log("Tile layer data:", _layer.data);
			// 'layer.data' holds the tile indices
		  }
		});
	  })
	  .catch(error => {
		console.error("Error loading TMJ file:", error);
	  });
	}
	
};


/* // Player starts at (0, 0)
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
} */