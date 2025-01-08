class LogicManager {
	constructor(engine) {
		this.engine = engine;
		this.eventManager = new EventManager(this);
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
	
	activate_scripts() {
		for (let [stage, scripts] of Object.entries(allScripts)) {
			scripts.forEach(script => {
				if (script.conditions) {
					const result = this.engine.logic.conditionManager.check_condition(script.conditions);
					if (result) Object.defineProperty(this.activeScripts, script.script_ID, {
						current_node: script.start_node,
						require_focus: script.require_focus || false
					});
				}
			});
		}
	}
}