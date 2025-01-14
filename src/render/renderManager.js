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
    this.ctx = CTX;
	this.showDebug = false;
	this.init();
  }
	
  init() {
	myPromise
	.then(() => this.ctx.lazyloadEnvironmentCTX?.())
	.then(() => this.ctx.lazyloadDialogueCTX());
	this.init_events();
  }
	
  render_sprite(ctx, spriteSheet, imageX, imageY, 
	captureWidth, captureHeight, canvasX, canvasY, canvasWidth, canvasHeight) {
			
	if (!ctx || !spriteSheet || !imageX || !imageY || !captureWidth || 
	    !captureHeight || !canvasX || !canvasY || !canvasWidth || !canvasHeight)
		this.eventManager.trigger('error', { type: 'param', message: 'One of the property passed to render sprite is null' });	
	
	ctx.drawImage(spriteSheet, imageX, imageY, 
	captureWidth, captureHeight, canvasX, canvasY, 
	  canvasWidth, canvasHeight);
  }
	
  render_data(data) {
	if (!data) return;
	const { context, spriteSheet, imageX, imageY, captureWidth, 
	  captureHeight, canvasX, canvasY, canvasWidth, canvasHeight } = data;
	if (data !== null) this.render_sprite(context, spriteSheet, 
	  imageX, imageY, captureWidth, captureHeight, canvasX, canvasY,
	  canvasWidth, canvasHeight);
  }
	
  clear_sprite(ctx, clearWidth, clearHeight) {
	ctx.clearRect(0, 0, clearWidth, clearHeight);
  }
  
  render_character(datas) {
    if (!datas) this.eventManager.trigger('error', { type: 'param', message: 'The PARAM in render_character of RenderManager is empty.' }); 
  }
	
  render_speaker_portrait(speaker) {
	if (!speaker || !speaker.character || !speaker.portrait) 
	  this.eventManager.trigger('error', { type: 'param', message: 'The PARAM passed to render_speaker_portrait is not corret.' });
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
		this.eventManager.trigger('error', {type: 'render', message: 'Key is not found in get ctx', 
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
  
  init_events() {
    this.eventManager.on('renderSprite', (payload) => {
	  const { ctxArray, assets, imageX, imageY, captureWidth, captureHeight, 
	  canvasX, canvasY, canvasWidth, canvasHeight } = payload;
	  const currentCTX = this.get_ctx(ctxArray);
	  this.render_sprite(currentCTX, assets, imageX, imageY, captureWidth, captureHeight, 
	    canvasX, canvasY, canvasWidth, canvasHeight);
	});
	this.eventManager.on('getCTX', (payload) => {
	  const { ctxArray, cb } = payload;
	  const currentCTX = this.get_ctx(ctxArray);
	  cb(currentCTX);
	});
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