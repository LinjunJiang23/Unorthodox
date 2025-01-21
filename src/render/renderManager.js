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
  constructor(eventManager, camera) {
	this.eventManager = eventManager;
    this.ctx = CTX;
	this.showDebug = false;
	this.init();
	this.visibilityManager;
	this.envManager;
	this.animationSystem;
  }
	
  init() {
	myPromise
	.then(() => this.ctx.lazyloadEnvironmentCTX?.())
	.then(() => this.ctx.lazyloadDialogueCTX());
	this.init_events();
	this.envRenderer = new EnvRenderer(this);
  }
  
  render() {
    this.render_env();	
	this.render_entities();
  }
  
  render_entities() {
    const visibleAnimations = 
	  this.animationSystem.get_animations(this.visibilityManager.visibleEntities);
  }
	
  render_interactables() {
	return null;
  }
  
  render_team(datas) {
    const currentCTX = this.ctx.get_ctx(['environment', 'team']);
    
	datas.forEach(data => {
	  const rd = data.get_render_data();
	  rd['context'] = currentCTX;
	  this.eventManager.trigger('getCentralState', { keys: ['setting', 'viewportSize'], cb: (data) => {
	    rd['canvasWidth'] = data.width;
	    rd['canvasHeight'] = data.height;
	  }});
	  this.render_sprite(rd);
	});
  }
	
  render_sprite({ context, spriteSheet, imageX, imageY, 
	captureWidth, captureHeight, canvasX, canvasY, canvasWidth, canvasHeight }) {
			
	if (!ctx || !spriteSheet || !imageX || !imageY || !captureWidth || 
	    !captureHeight || !canvasX || !canvasY || !canvasWidth || !canvasHeight)
		this.eventManager.trigger('error', { type: 'param', message: 'One of the property passed to render sprite is null' });	
	
	ctx.drawImage(spriteSheet, imageX, imageY, 
	captureWidth, captureHeight, canvasX, canvasY, 
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
  }
};