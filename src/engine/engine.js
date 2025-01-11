// src/engine/engine.js

class Engine {
  constructor() {
	if (Engine.instance) return Engine.instance;
	Engine.instance = this;
		
	this.isGameRunning = false;
	this.eventManager = new EventManager();
	this.lastUpdate = performance.now();
	this.camera = new Camera();
	this.timeManager = new TimeManager(this);
		
	this.errorHandler = new ErrorHandler(this.eventManager);
	this.inputHandler = new InputHandler();
	this.assetLoader = new AssetLoader(this.eventManager);
	this.settings = new SettingManager(this.eventManager);
	this.logic = new LogicManager(this.eventManager, this.inputHandler);
	this.stateManager = new StateManager(this.eventManager);
		//this.saveSystem = new SaveSystem();
		
	this.ui = new UIManager(this.eventManager, this.inputHandler);
	this.renderManager = new RenderManager(this.eventManager);
		
	this.audioManager;
	this.logic;
	this.eventManager.on('startNewGame', (payload) => {
	   this.initialize_game();
	});
  }
	
  initialize_game() {
	this.isGameRunning = true;
	this.game_loop(0);
  }
	
  game_loop(timestamp) {
	if (!this.isGameRunning) {
	  return;
	}
	this.render_game();
	this.update_game(timestamp);
	this.timeManager.update(timestamp);
	requestAnimationFrame(this.game_loop.bind(this));
  }
	
  update_game(timestamp) {
	this.logic.update(timestamp);
  }
	
  render_game() {
	myPromise
	.then(() => this.renderManager.render_env(this.logic.env.currentArea))
	.then(() => this.renderManager.render_team())
	.then(() => this.renderManager.render_NPCs())
	//.then(() => this.renderManager.render_ui())
	.then(() => this.renderManager.render_display());
  }
	
  pause_game() {
  }
};

const engine = new Engine();