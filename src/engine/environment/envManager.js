// scripts/mechanisms/physics/environment/envManager.js

/** 
 * Singleton that centralizes environment in game viewport
 */ 
class EnvManager {
	constructor() {
		if (EnvManager.instance) {
			return EnvManager.instance;
		}
		EnvManager.instance = this;
	}
	
	init(loc) {
		this.loc;
		this.env;
		this.x = 0;
		this.y = 0;
		if ($('#canvas-environment').length !== 0) {
			const ctx = getCTX('environment');
			//If map, renders the map relative to the camera point			
			if (tileMapManager.tileMapExists(loc)) {
				if (this.loc !== loc) this.loc = loc;
				if (this.env !== tileMapManager.getTileMap(this.loc)) 
					this.env = tileMapManager.getTileMap(this.loc);
			
				let pos = camera.getPosition();
				this.x = pos.x;
				this.y = pos.y;
				let viewportSize = 256;
				let sheets = mapLoader.getSpriteSheets();
				ctx.clearRect(0, 0, 1024, 1024);
				drawSprite(ctx, sheets[loc], pos.x, pos.y, 
					viewportSize, viewportSize, 0, 0, 1024, 1024);
			}
		}
	}
	
	renderEnvironment() {
		//If canvas exists, starts rendering
		if ($('#canvas-environment').length !== 0) {
			const ctx = getCTX('environment');
			//If map, renders the map relative to the camera point			
			if (tileMapManager.tileMapExists(this.loc)) {
				if (this.env !== tileMapManager.getTileMap(this.loc)) 
					this.env = tileMapManager.getTileMap(this.loc);
			
				let pos = camera.getPosition();
				if (this.x !== pos.x || this.y !== pos.y) {
				  this.x = pos.x;
				  this.y = pos.y;
				  let viewportSize = 256;
				  let sheets = mapLoader.getSpriteSheets();
				  ctx.clearRect(0, 0, 1024, 1024);
				  drawSprite(ctx, sheets[this.loc], pos.x, pos.y, 
				  viewportSize, viewportSize, 0, 0, 1024, 1024);
				}
				
				ctx.fillStyle = "white";
				ctx.font = "12px Arial";
				ctx.fillText(`Camera position: (${camera.x.toFixed(2)}, ${camera.y.toFixed(2)})`, 10, 70);
				let tempX = Math.floor(player.model.physics.x / 16);
				let tempY = Math.floor(player.model.physics.y / 16);
				ctx.fillText(`Tile index currently at: (${tempX}, ${tempY})`, 10, 90);
			}
		}
	}
	
	getActiveSections(point, viewportWidth = 16, viewportHeight = 16) {
		const startSectionX = Math.floor((point.x / 16) / this.env.sectionWidth) - 1;
		const startSectionY = Math.floor((point.y / 16) / this.env.sectionHeight) - 1;
		const endSectionX = Math.floor(((point.x / 16) + viewportWidth) / this.env.sectionWidth) - 1;
		const endSectionY = Math.floor(((point.y / 16) + viewportHeight) / this.env.sectionHeight) - 1;
		
		
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

const envManager = new EnvManager();