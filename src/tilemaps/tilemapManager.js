/**
 * Singleton class that centralizes storage for all current TileMaps
 */
class TilemapManager {
	
	constructor() {
		this.tilemaps = new Map();
	}
	
	/**
     * Load maps into the TileMaps variable
	 * @param {Object} tilemap - TileMap object
	 */
	add_tilemap(tilemap) {
		if (tilemap instanceof TileMap) {
			
		  //Check for duplicate map data
		  if (!this.tilemaps.has(tilemap)) {
			this.tilemaps.set(tilemap.getName(), tilemap);
		  } else {
			console.log(`Duplicate map data: ${tilemap.getName()}!`);
		  }
	    }
	}
	
	tilemap_exists(tilemapName) {
		if (this.tilemaps.has(tilemapName)) {
			return true;
		}
		return false;
	}
	
	get_tilemap(tilemapName) {
		return this.tilemaps.get(tilemapName);
	}
};

