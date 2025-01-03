// src/render/renderEnv.js

class RenderEnv {
	constructor(renderManager) {
		this.renderManager = renderManager;
		this.engine = this.renderManager.engine;
	}
	
	get_data(currentArea) {		
		const bgData = this.get_background(currentArea);
		const terrainData = this.get_terrain(currentArea);
		const interactablesData = this.get_interactables(currentArea);
		const particleData = this.get_particle();
		const lightingData = this.get_lighting();
		const weatherData = this.get_weather();
		
		const envData = {
			weather: weatherData,
			lighting: lightingData,
			particle: particleData,
			interactables: interactablesData,
			terrain: terrainData,
			background: bgData
		};
		
		
		return envData;
		
	}
	
	get_background(currentArea) {
		const bgSheets = 
				this.engine.assetLoader.get_assets('maps', currentArea);
		
		const cameraPos = this.engine.camera.get_position();
		const captureX = this.engine.camera.maxX;
		const captureY = this.engine.camera.maxY;
			
		const currentCTX = this.renderManager.ctx['environment']['background'];
		
		if (!currentCTX) {
			console.error("The background ctx isn't right!");
		}
		
		const bgData = {
			context: currentCTX, 
			spriteSheet: bgSheets,
			imageX: cameraPos.x,
			imageY: cameraPos.y,
			captureWidth: captureX,
			captureHeight: captureY,
			canvasX: 0,
			canvasY: 0,
			canvasWidth: currentCTX.canvas.width,
			canvasHeight: currentCTX.canvas.height
		};
		
		return bgData;
	}
	
	get_terrain(currentArea) {
		return null;
	}
	
	get_interactables(currentArea) {
		return null;
	}
	
	get_particle() {
		return null;
	}
	
	get_lighting() {
		return null;
	}
	
	get_weather() {
		return null;
	}
};
