// src/engine/engine.js

class Engine {
	constructor() {
		if (Engine.instance) return Engine.instance;
		Engine.instance = this;
		
		this.isGameRunning = false;
		this.lastUpdate = performance.now();
		this.camera = new Camera();
		this.timeManager = new TimeManager(this);
		this.inputHandler = new InputHandler(this);
		this.assetLoader = new AssetLoader();
		this.settings = new SettingManager();
		this.logic = new LogicManager(this);
		this.stateManager = new StateManager(this);
		//this.saveSystem = new SaveSystem();
		
		myPromise.then(() => {
			myPromise.then(() => this.ui = new UIManager(this))
			.then(() => this.ui.init());
		})
		.then(() => {
			myPromise
			.then(() => this.renderManager = new RenderManager(this))
			.then(() => this.renderManager.init());
		});
		
		this.settings.init();
		
		this.audioManager;
		this.logic;
		
	}
	
	initialize_game() {
		myPromise
		.then(() => this.ui.start_gameEnv())
		.then(() => {
			window.addEventListener("keydown", (event) => this.inputHandler.handle_input(event));
			window.addEventListener("keyup", (event) => this.inputHandler.handle_input(event));
			window.addEventListener('click', (event) => this.inputHandler.handle_input(event));
		})
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
		this.stateManager.update(timestamp);
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