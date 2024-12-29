// src/engine/campaign/campaignManager.js

class CampaignManager {
	
	constructor(engine) {
		if (engine instanceof Engine) this.engine = engine;
		this.members = [this.engine.player];
		this.team = new TeamManager(this);
	}
	
	add_member(member) {
		if (!this.members.includes(member) && member instanceof BaseCharacter) { 
			this.members.push(member);
		}
	}
	
	remove_member(member) {
		const index = this.members.indexOf(member);
		if (index > -1) this.members.splice(index, 1);
	}
};