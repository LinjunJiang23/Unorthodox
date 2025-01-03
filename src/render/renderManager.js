// src/engine/render/renderManager.js


/**
 * @todo layers may need internal sorting based on proximity 
 * to the camera for correct z-order rendering 
 */
 
/**
 * Centralize render logics
 * @class
 * @property {class} engine
 * @property {class} assetLoader
 * @property {Object} ctx
 * @property {Boolean} showDebug
 * @property {class} renderEnv
 * @property {class} renderTeam
 * @property {class} renderNPCs
 */
class RenderManager {
    constructor(engine) {
		this.engine = engine;
		this.assetLoader = this.engine.assetLoader;
        this.ctx = CTX;
		this.showDebug = false;
    }
	
	init() {
		myPromise
		.then(() => this.ctx.lazyloadEnvironmentCTX?.())
		.then(() => this.ctx.lazyloadDialogueCTX())
		.then(() => this.renderEnv = new RenderEnv(this))
		.then(() => this.renderTeam = new RenderTeam(this));
	}
	
	render_sprite(ctx, spriteSheet, imageX, imageY, 
	  captureWidth, captureHeight, canvasX, canvasY, canvasWidth, canvasHeight) {
			
		if (!ctx) {
			console.error("Invalid context passed to render_sprite");
			return;
		}
		
		ctx.drawImage(spriteSheet, imageX, imageY, 
		  captureWidth, captureHeight, canvasX, canvasY, 
		  canvasWidth, canvasHeight);
	}
	
	
	
	render_env(currentArea) {
		const envData = this.renderEnv.get_data(currentArea);
		Object.values(envData).forEach(data => this.render_data(data));
	}
	
	
	
	render_team() {
		const teamData = this.renderTeam.get_data();
		this.clear_sprite(this.ctx['environment']['team'], 
			this.ctx['environment']['team'].canvas.width, this.ctx['environment']['team'].canvas.height);
		
		// Object.values(teamData).forEach(data => {
		// this.render_datas(teamData);
	}
	
	render_data(data) {
		if (data !== null) 
		  this.render_sprite(data['context'], data['spriteSheet'], data['imageX'], data['imageY'],
			data['captureWidth'], data['captureHeight'], data['canvasX'], data['canvasY'],
			data['canvasWidth'], data['canvasHeight']);
	}
	
	clear_sprite(ctx, clearWidth, clearHeight) {
		ctx.clearRect(0, 0, clearWidth, clearHeight);
	}
	
	render_speaker_portrait(speaker) {
		if (speaker !== null) {
			const sheets = this.assetLoader.get_assets(this.speaker.character, this.speaker.portrait);
			const currentCTX = 
				this.ctx['dialogue']['portrait'];
			
			this.render_sprite(currentCTX, sheets, 0, 0, 2480, 3508,
				currentCTX.canvas.width, currentCTX.canvas.height);
		}
	}
	
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
	
	render_NPCs() {
	}
	
	render_inGameUI() {
	}
	
	render_display() {
	}
	
	render_worldmap(areaName) {
    }

};

//This is for debug...
			
		// const tempX = Math.floor(this.engine.player.model.physics.x / 16);
		// const tempY = Math.floor(this.engine.player.model.physics.y / 16);
		// currentCTX.fillText(`Tile index currently at: (${tempX}, ${tempY})`, 10, 90);
		
		// currentCTX.fillStyle = "white";
		// currentCTX.font = "12px Arial";
		// currentCTX.fillText(`Camera position: (${cameraX.toFixed(2)}, ${cameraY.toFixed(2)})`, 10, 70);
		//ctx.strokeStyle = "red";
		// ctx.strokeRect(
		// landedPosition.x - (targetWidth / 2),
		// landedPosition.y - (targetHeight / 2),
		// targetWidth,
		// targetHeight
		// );

		// ctx.fillStyle = "white";
		// ctx.font = "12px Arial";
		// ctx.fillText(`Player Position on Screen: (${landedPosition.x.toFixed(2)}, ${landedPosition.y.toFixed(2)})`, 10, 20);
		// ctx.fillText(`Player Position on map: (${player.model.physics.x.toFixed(2)}, ${player.model.physics.y.toFixed(2)})`, 10, 50);