class LogicManager {
  constructor(eventManager, inputHandler) {
	this.eventManager = eventManager;
	this.inputHandler = inputHandler;
	this.eventManager.on('startNewGame', (payload) => {
	  this.init();
	});
  }
  
  update(timestamp) {
	this.leaderController.update(timestamp);
	this.animationSystem.update(timestamp, this.visibilityManager.visibleEntities);
  }
  
  init() {
	this.scriptManager = new ScriptManager(this.eventManager, this.inputHandler);
	this.animationSystem = new AnimationSystem(this.eventManager);
	this.visibilityManager = new VisibilityManager(this.eventManager.engine.camera, this.eventManager);
	this.combatManager = new CombatManager(this.eventManager);
	this.world = new WorldManager(this.eventManager);
	this.env = new EnvManager(this, this.eventManager.engine.camera);
	this.characters = new CharacterManager(this.eventManager);
	this.campaign = new CampaignManager(this.eventManager, this.characters);
	this.leaderController = new LeaderController(this.eventManager, this.inputHandler);
  }
};