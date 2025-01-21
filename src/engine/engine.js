// src/engine/engine.js

class Engine {
  constructor() {
	if (Engine.instance) return Engine.instance;
	Engine.instance = this;
		
	this.isGameRunning = false;
	this.eventManager = new EventManager(this);
	this.lastUpdate = performance.now();
	this.camera = new Camera(this.eventManager);
	this.timeManager = new TimeManager(this, this.eventManager);
		
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
	this.renderManager.envManager = this.logic.envManager;
	this.renderManager.animationSystem = this.logic.animationSystem;
	this.renderManager.visibilityManager = this.logic.visibilityManager;
	this.game_loop(0);
  }
	
  game_loop(timestamp) {
	if (!this.isGameRunning) {
	  return;
	}
	this.update_game(timestamp);
	this.timeManager.update(timestamp);
	requestAnimationFrame(this.game_loop.bind(this));
  }
	
  update_game(timestamp) {
	this.logic.update(timestamp);
  }
	
  pause_game() {
	this.isGameRunning = false;
  }
};

const engine = new Engine();