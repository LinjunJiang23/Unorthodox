// src/engine/campaign/campaignManager.js

class CampaignManager {
	
	constructor(logic) {
		if (logic instanceof LogicManager) this.logic = logic;
		this.members = [];
		this.add_member(this.logic.characters.player.player);
		this.team = new TeamManager(this);
	}
	
	update(timestamp) {
		this.members.forEach(member => member.update(timestamp));
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