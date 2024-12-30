// src/engine/engine.js

class Engine {
	constructor() {
		if (Engine.instance) return Engine.instance;
		Engine.instance = this;
		
		this.isGameRunning = false;
		this.lastUpdate = performance.now();
		
		this.campaign;
		this.world;
		this.player;
		this.camera;
		this.combatManager;
		this.timeManager;
		this.eventManager;
		this.npcManager;
		this.audioManager;
		this.inputHandler = new InputHandler(this);
		this.assetLoader = new AssetLoader();
		this.renderManager = new RenderManager(this);
		this.ui = new UIManager(this);
		this.settings = new SettingManager();
		myPromise.then(() => this.ui.init())
		.then(() => {
			this.renderManager.init();
		});
		//this.saveSystem = new SaveSystem();
	}
	
	initialize_game() {
		this.combatManager = new CombatManager(this);
		this.world = new WorldManager(this);
		this.camera = new Camera();
		this.player = new Player();
		this.campaign = new CampaignManager(this);
		this.env = new EnvManager(this);
		
		this.ui.hide_UI('startscreen');
		this.ui.show_UI('gameUI', 'gameEnv');
	}
	
	game_loop(timestamp) {
		if (this.isGameRunning) {
			this.handle_input();
			// npc.moveToNextGrid(timestamp);
			this.envManager.renderEnvironment();
			updateGameTime(timestamp);
		} 
		requestAnimationFrame(this.game_loop.bind(this));
	}
	
	handle_input() {
		this.inputHandler.handle_kb_control(timestamp);
		this.inputHandler.handle_mouse_control(timestamp);
	}
	
	update_game() {
	}
	
	render_game() {
	}
	
	handle_interaction() {
	}
	
	update_camera() {
	}
	
	change_map() {
	}
	
	initialize_npc() {
	}
	
	update_npcs() {
	}
	
	start_combat() {
	}
};

const engine = new Engine();