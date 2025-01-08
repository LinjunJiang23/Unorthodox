// src/characters/characterManager.js


class CharacterManager {
	constructor(logic) {
		this.logic = logic;
		this.player = new PlayerManager(this);
		this.specials = new SpecialCharacterManager(this.logic);
		this.npcs = new NPCManager(this);
	}
	
	update(timestamp) {
		this.player.update(timestamp);
		this.specials.update(timestamp);
		this.npcs.update(timestamp);
	}
	
  update_player() {
	
  }
	
  find_character(targetTag, targetID) {
	return this[targetTag].find(targetID);
  }
};