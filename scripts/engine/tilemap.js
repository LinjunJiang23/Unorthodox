// scripts/utils/tilemap.js

/**
 * TileMap - a class that stores tile map information 
 */
class TileMap {
	/**
	 * @param {string} name - name of the map
	 * @param {Object} data - map data
	 */
	constructor(name, data, sectionWidth = 4, sectionHeight = 4) {
		if (typeof name === "string" && typeof data === "object") {
			this.name = name;
			this.tiles = {};
			this.tilelayers = data.layers;
			this.width = data.width;
			this.height = data.height;
			(typeof sectionWidth === "number" && sectionWidth >= 0) ? 
				this.sectionWidth = sectionWidth : 
				this.sectionWidth = 4;
			(typeof sectionHeight === "number" && sectionHeight >= 0) ? 
				this.sectionHeight = sectionHeight : 
				this.sectionWidth = 4;
			this.sections = new Map();
			this.staticCollision = new Set();
			this.tilelayers.forEach(_layer => {
		    if (_layer.type === "tilelayer") {
			  
			  //Add collision
			  if (_layer.name === "Obstacles") {
				_layer.data.forEach((tile, i) => {
					if (tile !== 0) {
						const x = i % this.width;
						const y = Math.floor(i / this.height);
						this.staticCollision.add(`${x},${y}`);
					}
				});
			  }			 
		    }
		  });
		  this.divideIntoSections();
		}
	}
	
	isStaticCollision(x, y) {
		return this.staticCollision.has(`${x},${y}`);
	}
	
	addStaticCollision(x, y) {
		if (typeof x === "number" && typeof y === "number") {
			this.staticCollision.add(`${x},${y}`);
		}
	}
	
	divideIntoSections() {
		for (let y = 0; y < this.height; y++) {
			for (let x = 0; x < this.width; x++) {				
				if (this.staticCollision.has(`${x},${y}`)) {
					const sectionX = Math.floor(x / this.sectionWidth);
					const sectionY = Math.floor(y / this.sectionHeight);
					const sectionKey = `${sectionX},${sectionY}`;
					
					if (!this.sections.has(sectionKey)) {
						this.sections.set(sectionKey, { staticCollision: [] });
					}
					
					const section = this.sections.get(sectionKey);
					section.staticCollision.push(`${x},${y}`);
				}
			}
		}
	}
	
	getSection(sectionX, sectionY) {
		return this.sections.get(`${sectionX},${sectionY}`) || null;
	}
	
	/* Start of SETTERs */
	/* End of SETTERs */
	
	/* Start of GETTERs */
	getName() {
		return this.name;
	}
	
	getSections() {
		return this.sections;
	}
		
	getStaticCollision() {
		return this.staticCollision;
	}
	/* End of GETTERs */
};



/**
 * TileMapManager - singleton class that centralizes storage for all current TileMaps
 */
class TileMapManager {
	static instance = null;
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