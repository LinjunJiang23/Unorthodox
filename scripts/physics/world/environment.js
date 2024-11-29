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
				this.env = tileMapManager.getTileMap(mapName);
				const ctx = getCTX('environment');
				let sheets = mapLoader.getSpriteSheets();
				let pos = camera.getPosition();
				let viewportSize = 256;

				ctx.clearRect(0, 0, 1024, 1024);

				drawSprite(ctx, sheets[mapName], pos.x, pos.y, viewportSize, viewportSize, 0, 0, 1024, 1024);
				ctx.fillStyle = "white";
				ctx.font = "12px Arial";
				ctx.fillText(`Camera position: (${camera.x.toFixed(2)}, ${camera.y.toFixed(2)})`, 10, 90);
			}
		}
	}
	
	reportTileIndex(x, y) {
		console.log(Math.floor(x / 16), Math.floor(y / 16));
	}
	
	getActiveSections(viewportX, viewportY, viewportWidth = 16, viewportHeight = 16) {
		const startSectionX = Math.floor((viewportX / 16) / this.env.sectionWidth) - 1;
		const startSectionY = Math.floor((viewportY / 16) / this.env.sectionHeight) - 1;
		const endSectionX = Math.floor(((viewportX / 16) + viewportWidth) / this.env.sectionWidth) - 1;
		const endSectionY = Math.floor(((viewportY / 16) + viewportHeight) / this.env.sectionHeight) - 1;
		
		
		const activeSections = [];
		for (let y = startSectionY; y <= endSectionY; y++) {
			for (let x = startSectionX; x<= endSectionX; x++) {
				const section = this.env.getSection(x, y);
				if (section) {
					activeSections.push(section);
				}
			}
		}
		
		return activeSections;
	}
	
};

let envManager = new EnvironmentManager();