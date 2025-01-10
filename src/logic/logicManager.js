class LogicManager {
  constructor(engine) {
	this.engine = engine;
  }
	
  init() {
	this.combatManager = new CombatManager(this);
	this.world = new WorldManager(this);
	this.characters = new CharacterManager(this);
	this.campaign = new CampaignManager(this);
	this.env = new EnvManager(this);
	this.leaderController = new LeaderController(this);
	this.scriptManager = new ScriptManager(this.eventManager);
  }
	
  update(timestamp) {
	this.leaderController.update(timestamp);
	this.env.update(timestamp);
	this.campaign.update(timestamp);
  }
  
};