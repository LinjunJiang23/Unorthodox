// src/engine/engine.js

class Engine {
	constructor() {
		if (Engine.instance) return Engine.instance;
		Engine.instance = this;
		
		this.isGameRunning = false;
		this.lastUpdate = performance.now();
		this.camera = new Camera();
		this.timeManager = new TimeManager(this);
		this.eventManager = new EventManager();
		this.errorHandler = new ErrorHandler(this.eventManager);
		this.inputHandler = new InputHandler();
		this.assetLoader = new AssetLoader(this.eventManager);
		this.settings = new SettingManager(this.eventManager);
		this.logic = new LogicManager(this.eventManager);
		this.stateManager = new StateManager(this.eventManager);
		//this.saveSystem = new SaveSystem();
		
		this.ui = new UIManager(this.eventManager);
		this.renderManager = new RenderManager(this.eventManager);
		
		this.audioManager;
		this.logic;
		
	}
	
  initialize_game() {
	this.eventManager.trigger('startNewGame', {timestamp: performance.now()});
	this.isGameRunning = true;
	this.game_loop(0);
		myPromise
		.then(() => this.ui.start_gameEnv())
		.then(() => this.inputHandler.init())
		.then(() => this.logic.init())
		.then(() => this.stateManager.initialize_state())
		.then(() => this.isGameRunning = true)
		.then(() => this.game_loop(0));
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