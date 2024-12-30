// src/engine/render/renderManager.js


/**
 * @todo layers may need internal sorting based on proximity 
 * to the camera for correct z-order rendering 
 */
class RenderManager {
    constructor(engine) {
		this.engine = engine;
		
        this.canvas = canvas;
        this.ctx = CTX;
		
		this.showDebug = false;
		myPromise
		.then(() => this.canvas.lazyloadEnvironmentCanvas?.())
		.then(() => this.ctx.lazyloadEnvironmentCTX?.());
    }
	
	init() {
		
	}

    render_sprite(ctx, spriteSheet, canvasName, sprite, spriteX, spriteY, 
		spriteWidth, spriteHeight, posX, posY, sizeCanvasX, sizeCanvasY) {
		
		if (!ctx) {
			console.error("Invalid context passed to render_sprite");
			return;
		}
		
		ctx.drawImage(spriteSheet, 
			spriteX, spriteY, 
			spriteWidth, spriteHeight, 
			posX, posY, 
			sizeCanvasX, sizeCanvasY);
    }

    render_worldmap(areaName) {
    }
	
	render_env(currentArea) {
		
		const pos = this.engine.camera.get_position();
		const resolution = this.engine.settings.graphics['resolution'];
		const canvasX = resolution['viewportWidth'];
		const canvasY = resolution['viewportHeight'];
		
		const bgSheets = 
				this.engine.assetLoader.get_assets('maps', currentArea);
				
		this.render_background(bgSheets, pos.x, pos.y, canvasX, canvasY);
				
			//This is for debug...
			// ctx.fillStyle = "white";
			// ctx.font = "12px Arial";
			// ctx.fillText(`Camera position: (${camera.x.toFixed(2)}, ${camera.y.toFixed(2)})`, 10, 70);
			// const tempX = Math.floor(player.model.physics.x / 16);
			// const tempY = Math.floor(player.model.physics.y / 16);
			// ctx.fillText(`Tile index currently at: (${tempX}, ${tempY})`, 10, 90);
	}
	
	render_background(sheets, cameraX, cameraY, canvasX, canvasY) {
		//Only re-render background when camera changes position
		if (this.engine.env.x !== cameraX || this.y !== cameraY) {
			this.engine.env.x = cameraX;
			this.engine.env.y = cameraY;
				  
			const captureX = this.engine.camera.width;
			const captureY = this.engine.camera.height;
			
			
				
			
			console.log("This is the retrieved sheet: ", sheets);

			
			const currentCTX = this.ctx['environment']['background'];
			
			currentCTX.clearRect(0, 0, canvasX, canvasY);
			this.render_sprite(currentCTX, sheets, cameraX, cameraY, 
			captureX, captureY, 0, 0, canvasX, canvasY);
		}
	}
	
	
	render_animation_frame(ctx, sheets, 
		intendedSpritePos, landedPosition, 
		targetWidth = 128, targetHeight = 128) {
		ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
		
		this.render_sprite(ctx, spriteSheet.baseBody, intendedSpritePos.x, intendedSpritePos.y, 
			128, 128, 
			(landedPosition.x - (targetWidth / 2)), (landedPosition.y - (targetHeight / 2)), 
			targetWidth, targetHeight);
		
		ctx.strokeStyle = "red";
		ctx.strokeRect(
		landedPosition.x - (targetWidth / 2),
		landedPosition.y - (targetHeight / 2),
		targetWidth,
		targetHeight
		);

		ctx.fillStyle = "white";
		ctx.font = "12px Arial";
		ctx.fillText(`Player Position on Screen: (${landedPosition.x.toFixed(2)}, ${landedPosition.y.toFixed(2)})`, 10, 20);
		ctx.fillText(`Player Position on map: (${player.model.physics.x.toFixed(2)}, ${player.model.physics.y.toFixed(2)})`, 10, 50);
	}
	
	render_animation_NPCs(){}
	
	render_animation_companions(){}
	
	render_animation_player() {}
		
	get_ctx(...keys) {
		let current = this.ctx;
		for (let key of keys) {
			if (current[key]) {
				current = current[key];
			} else {
				console.warn(`Key "${key}" not found in ctx.`);
				return; // Exit if a key is invalid
			}
		}
		return current;
	}
};