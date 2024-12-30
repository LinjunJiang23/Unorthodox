// src/engine/team/subteam.js

class Subteam {
	constructor(mainteam, members) {
		this.mainteam = mainteam;
		this.members = [];
		this.add_members(members);
		this.leader = this.members[0];
		this.inControl = false;
	}
	
	add_members(characters) {
		if (!Array.isArray(characters)) return;
		
		characters.forEach(character => {
			if (!(character instanceof BaseCharacter)) {
				console.log('Sub team containing members: ', this.members, 
				'attempt to add a wrong character: ', character);
			}
			
			if (this.members.includes(character)) return;
			
			
			let index = 0;
			this.mainteam.subteams.forEach(subteam => {
				if (subteam.includes(character)) {
					subteam.removeMember(character);
					if (subteam.length <= 0) this.mainteam.subteams.splice(index, 1);
				}
				index++;
			});
			
			this.members.push(character);
		});
	}
	
	remove_members(character) {
		if (this.members.includes(character)) {
		  this.members = this.members.filter(member => member === character);
		}
	}
	
	set_leader(character) {
		if (this.members.includes(character) && this.leader !== character) {
			this.leader = character;
		}
	}
	
	validate_subteam() {
		return ( 
			this.members.length <= 3 && 
			this.members.length > 0 );
	}
};