// scripts/utils/tilemap.js

/**
 * TileMap - a class that stores tile map information 
 */
class TileMap {
	/**
	 * @param {string} name - name of the map
	 * @param {Object} data - map data
	 */
	constructor(name, data) {
		if (typeof name === "string" && typeof data === "object") {
			this.name = name;
			this.tiles = {};
			this.tilelayers = data.layers;
			this.collision = new Set();
			this.events = new Set();
			this.width = data.width;
			this.height = data.height;
			this.tilelayers.forEach(_layer => {
		    if (_layer.type === "tilelayer") {
			  
			  //Add collision
			  if (_layer.name === "Obstacles") {
				_layer.data.forEach((tile, i) => {
					if (tile !== 0) {
						const x = i % this.width;
						const y = Math.floor(i / this.width);
						const index = y * this.width + x;
						this.collision.add(index);
					}
				});
			  }
			  
			 //Add main events
			 if (_layer.name === "MainEvents") {
			 
			 }
			 
			 //Add side events
			 if (_layer.name === "SideEvents") {
				 
			 }
			 
			 //Add interactive zones
			 if (_layer.name === "Interactives") {
			 
			 }
		    }
		  });  	
		}
	}
	
	isCollision(x, y) {
		if (typeof x === "number" && typeof y === "number") {
			const index = y * this.width + x;
			return this.collision.has(index);
		}
	}
	
	addCollision(x, y) {
		if (typeof x === "number" && typeof y === "number") {
			const index = y * this.width + x;
			this.collision.add(index);
		}
	}
	
	//function addTileEvent(x, y, eventType) {};
	
	/* Start of SETTERs */
	/* End of SETTERs */
	
	/* Start of GETTERs */
	getName() {
		return this.name;
	}
	
	getCollision() {
		return this.collision;
	}
	/* End of GETTERs */
};


/**
 * TileMapManager - singleton class that centralizes storage for all current TileMaps
 */
class TileMapManager {
	constructor() {
		if (TileMapManager.instance) {
			return TileMapManager.instance;
		}
		TileMapManager.instance = this;
		this.tilemaps = new Map();
	}
	
	/**
     * addTileMap - function to load maps into the TileMaps variable
	 * @param {Object} tilemap - TileMap object
	 */
	addTileMap(tilemap) {
		if (tilemap instanceof TileMap) {
			
		  //Check for duplicate map data
		  if (!this.tilemaps.has(tilemap)) {
			this.tilemaps.set(tilemap.getName(), tilemap);
		  } else {
			console.log(`Duplicate map data: ${tilemap.getName()}!`);
		  }
	    }
	}
	
	tileMapExists(tilemapName) {
		if (this.tilemaps.has(tilemapName)) {
			return true;
		}
		return false;
	}
	
	/* Start of SETTERs */
	/* End of SETTERs */
	
	/* Start of GETTERs */
	getTileMaps() {
		return this.tilemaps;
	}
	
	getTileMap(tilemapName) {
		return this.tilemaps.get(tilemapName);
	}
	/* End of GETTERs */
};

let tileMapManager = new TileMapManager();