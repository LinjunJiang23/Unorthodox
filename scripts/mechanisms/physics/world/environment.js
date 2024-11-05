// scripts/mechanisms/physics/navigation/environment.js

/** 
 * EnvironmentManager - 
 */ 
class EnvironmentManager {
	constructor() {
		if (EnvironmentManager.instance) {
			return EnvironmentManager.instance;
		}
		EnvironmentManager.instance = this;
		this.env;
	}
	
	renderEnvironment(mapName) {
		//If canvas exists, starts rendering
		if ($('#canvas-environment').length !== 0) {
			//If map, renders the map relative to the camera point
			if (tileMapManager.tileMapExists(mapName)) {
				this.env = mapName;
				const ctx = getCTX('environment');
				let sheets = mapLoader.getSpriteSheets();
				let cameraPos = camera.getPosition();
				const viewportSize = 256;
				
				const startX = cameraPos.x - viewportSize / 2;
				const startY = cameraPos.y - viewportSize / 2;
				ctx.clearRect(0, 0, 800, 800);

				drawSprite(ctx, sheets[mapName], startX, startY, viewportSize, viewportSize, 0, 0, 800, 800);
			}
		}
	}
};

let envManager = new EnvironmentManager();