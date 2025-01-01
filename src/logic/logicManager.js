class LogicManager {
	constructor(engine) {
		this.engine = engine;
		this.combatManager = new CombatManager(this);
		this.world = new WorldManager(this);
		this.player = new Player(this);
		this.player.init();
		this.campaign = new CampaignManager(this);
		this.env = new EnvManager(this);
		this.leaderController = new LeaderController(this);
		this.eventManager;
		this.npcManager;
	}
	
	update(timestamp) {
		this.leaderController.update(timestamp);
		this.env.update(timestamp);
		this.campaign.update(timestamp);
	}
}