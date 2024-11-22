// scripts/mechanisms/physics/navigation/environment.js

/** 
 * EnvironmentManager - singleton class
 */ 
class EnvironmentManager {
	constructor() {
		if (EnvironmentManager.instance) {
			return EnvironmentManager.instance;
		}
		EnvironmentManager.instance = this;
		this.env;
	}
	
	/**
	 * renderEnvironment
	 */
	renderEnvironment(mapName) {
		//If canvas exists, starts rendering
		if ($('#canvas-environment').length !== 0) {
			//If map, renders the map relative to the camera point
			if (tileMapManager.tileMapExists(mapName)) {
				this.env = mapName;
				const ctx = getCTX('environment');
				let sheets = mapLoader.getSpriteSheets();
				let pos = camera.screenToMap(playerPosition);
				console.log("environment source position:", pos);
				let viewportSize = 256;

				ctx.clearRect(0, 0, 1024, 1024);

				drawSprite(ctx, sheets[mapName], pos.x, pos.y, viewportSize, viewportSize, 0, 0, 1024, 1024);
			}
		}
	}
};

let envManager = new EnvironmentManager();