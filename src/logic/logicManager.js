class LogicManager {
  constructor(eventManager, inputHandler) {
	this.eventManager = eventManager;
	this.inputHandler = inputHandler;
	this.eventManager.on('startNewGame', (payload) => {
	  this.init();
	});
  }
	
  init() {
	this.combatManager = new CombatManager(this);
	this.world = new WorldManager(this);
	this.characters = new CharacterManager(this);
	this.campaign = new CampaignManager(this);
	this.env = new EnvManager(this);
	this.leaderController = new LeaderController(this.eventManager, this.inputHandler);
	this.scriptManager = new ScriptManager(this.eventManager, this.inputHandler);
  }
	
  update(timestamp) {
	this.leaderController.update(timestamp);
	this.env.update(timestamp);
	this.campaign.update(timestamp);
  }
  
};