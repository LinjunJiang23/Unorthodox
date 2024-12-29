/**
 * Singleton class that centralizes storage for all current TileMaps
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
     * Load maps into the TileMaps variable
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
	
	getTileMaps() {
		return this.tilemaps;
	}
	
	getTileMap(tilemapName) {
		return this.tilemaps.get(tilemapName);
	}
};

const tileMapManager = new TileMapManager();