// src/engine/team/teamManager.js


class TeamManager {
  constructor(campaignManager) {
	this.campaign = campaignManager;
	this.members = this.campaign.members;
	this.leader = this.campaign.members[0];
	this.subteams = [new Subteam(this, this.members)];
	this.init_events();
  }
	
  add_member(member) {
	if (!this.members.includes(member) && member instanceof BaseCharacter) {
	  this.members.push(member);
	  const _subteam = new Subteam(this, [member]);
	  this.subteams.push(_subteam);
	}
  }
	
  split_subteam(members) {
	if (members.length <= 3 && members.length > 0) {
	  members.every(member => {
		if (!this.members.includes(member)) return false; 
	  });
	  const _subteam = new Subteam(this, members);
	  this.subteams.push(_subteam);
	}
  }
	
  merge_subteam(mainTeamId, subteamId) {
	const _subteam = this.subteams[subteamId - 1];
	this.subteams[mainTeamId - 1].addMembers(_subteam.members);
	this.subteams.splice((teamId - 1), 1);
  }
	
  get_subteam_by_id(teamId) {
	return this.subteams[teamId - 1];
  }
	
  validate_team() {
	if (this.members.length <= 3 && this.members.length > 0 && this.subteams.length <= 3) {		
	  let count = 0;
	  this.subteams.forEach(subteam => {
		count += subteam.members.length();
	  });
	  if (count !== this.members.length) {
		return false;
	  } else {
		console.log("");
		return true;
	  }
	}
	return false;
  }
  
  init_events() {
	  
  }
  
};