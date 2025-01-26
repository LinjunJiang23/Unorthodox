// src/engine/render/renderManager.js


/**
 * @todo layers may need internal sorting based on proximity 
 * to the camera for correct z-order rendering 
 */
 
/**
 * Centralize render logics
 * @class
 * @property {class} engine
 * @property {Object} ctx
 * @property {Boolean} showDebug
 */
class RenderManager {
  constructor(eventManager, sceneGraph) {
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
	this.envRenderer = new EnvRenderer();
  }
  
  render() {
	this.render_scene_graph();
	const data = this.envManager.bg;
	this.render_background(data);
  }
  
  render_scene_graph() {
    const nodes = this.eventManager.engine.sceneGraph.get_renderable_nodes();
	nodes.forEach(node => {
	  const currentCTX = this.ctx.get_ctx(['environment', node.data.layer]);
	  if (currentCTX) {
		this.clear_sprite(currentCTX, currentCTX.canvas.width, currentCTX.canvas.height);
		
		this.render_sprite({
	      context: currentCTX,
		  spriteSheet: node.data.spriteSheet,
		  imageX: node.data.imageX,
		  imageY: node.data.imageY,
		  captureWidth: node.data.captureWidth,
		  captureHeight: node.data.captureHeight,
		  canvasX: node.data.canvasX,
		  canvasY: node.data.canvasY,
		  canvasWidth: node.data.canvasWidth || currentCTX.canvas.width,
		  canvasHeight: node.data.canvasHeight || currentCTX.canvas.height
		});
	  }
	});
  }
  
  render_background(data) {
	const currentCTX = this.ctx.get_ctx(['environment', 'background']);
	if (data)
	  this.render_sprite({
		context: currentCTX,
		spriteSheet: data.spriteSheet,
		imageX: data.imageX,
		imageY: data.imageY,
		captureWidth: data.captureWidth,
		captureHeight: data.captureHeight,
		canvasX: data.canvasX,
		canvasY: data.canvasY,
		canvasWidth: currentCTX.canvas.width,
		canvasHeight: currentCTX.canvas.height
	  });
  }
	
  render_sprite({ context, spriteSheet, imageX, imageY, 
	captureWidth, captureHeight, canvasX, canvasY, canvasWidth, canvasHeight }) {
	if (!context || !spriteSheet || !imageX || !imageY || !captureWidth || 
	    !captureHeight || !canvasX || !canvasY || !canvasWidth || !canvasHeight)
		this.eventManager.trigger('error', { type: 'param', message: 'One of the property passed to render sprite is null' });	
	context.imageSmoothingEnabled = false;
	context.drawImage(spriteSheet, imageX, imageY, captureWidth, captureHeight, canvasX, canvasY, canvasWidth, canvasHeight);
  }
	
  clear_sprite(ctx, clearWidth, clearHeight) {
	ctx.clearRect(0, 0, clearWidth, clearHeight);
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
  
  init_events() {
	this.eventManager.on('renderBackground', (payload) => {
	  const { data } = payload;
	  this.render_background(data);
	});
  }
};