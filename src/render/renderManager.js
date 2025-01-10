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
  constructor(eventManager) {
	this.eventManager = eventManager;
	this.assetLoader = this.engine.assetLoader;
    this.ctx = CTX;
	this.showDebug = false;
	this.init();
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
			
	if (!ctx) this.eventManager.trigger('error', { type: 'render', message: `Context produces error.`, context: {ctx: ctx}});
		
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
	const teamCTX = this.get_ctx(['environment', 'team']);
	this.clear_sprite(teamCTX, 
	  teamCTX.canvas.width, teamCTX.canvas.height);
		
	  Object.values(teamData).forEach(data => 
	  this.render_data(data));
  }
	
  render_data(data) {
	const { context, spriteSheet, imageX, imageY, captureWidth, 
	  captureHeight, canvasX, canvasY, canvasWidth, canvasHeight } = data;
	if (data !== null) this.render_sprite(context, spriteSheet, 
	  imageX, imageY, captureWidth, captureHeight, canvasX, canvasY,
	  canvasWidth, canvasHeight);
  }
	
  clear_sprite(ctx, clearWidth, clearHeight) {
	ctx.clearRect(0, 0, clearWidth, clearHeight);
  }
	
  render_speaker_portrait(speaker) {
	if (!speaker || !speaker.character || !speaker.portrait) this.eventManager.trigger('error', { type: 'param', message: 'The PARAM passed to render_speaker_portrait is not corret.' });
	const { character, portrait } = speaker;
	const currentCTX = this.get_ctx(['dialogue', 'portrait']);
	this.eventManager.trigger('getAssets', { assetArray: [character, portrait], cb: (currentAsset) => {
	  this.render_sprite(currentCTX, currentAsset, 0, 0, currentAsset.width, currentAsset.height, 
	    0, 0, currentCTX.canvas.width, currentCTX.canvas.height );
	}});
  }
	
  get_ctx(keys) {
	let current = this.ctx;
	for (let key of keys) {
	  if (current[key]) {
		current = current[key];
	  } else {
		this.eventManager.trigger('error', {type: 'render', message: 'Key is not found in ctx', 
		  context: { key: key }});
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