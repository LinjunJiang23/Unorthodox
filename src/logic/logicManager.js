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
	this.env.update(timestamp);
  }
  
  init() {
	this.combatManager = new CombatManager(this.eventManager);
	this.world = new WorldManager(this.eventManager);
	this.characters = new CharacterManager(this.eventManager);
	this.campaign = new CampaignManager(this.eventManager, this.characters);
	this.env = new EnvManager(this);
	this.leaderController = new LeaderController(this.eventManager, this.inputHandler);
	this.scriptManager = new ScriptManager(this.eventManager, this.inputHandler);
  }
};