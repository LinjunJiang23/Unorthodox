// src/combat/combatManager.js

class CombatManager {
	constructor() {
		this.activeCombats = [];
	}
	
	initiate_combat() {
		const newCombat = new Combat(this);
		this.activeCombats.push(newCombat);
	}
	
	end_combat(combat) {
		const index = this.activeCombats.indexOf(combat);
		if (index > -1) this.activeCombats.splice(index, 1); 
	}
	
	update() {
		if (this.activeCombats.length !== 0) {
			this.activeCombats.forEach(combat => combat.update());
		}
	}
};