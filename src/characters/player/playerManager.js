// src/characters/player/playerManager.js


class PlayerManager {
	constructor(characterManager) {
		this.characterManager = characterManager;
		this.player = new Player(this.characterManager.logic);
		this.player.init();
	}
	
	save_player_data() {
	}
	
	find_relationship(character, target) {
		this.player.relationshipManager.find_relationship_with(character, target);
	}
	
	update(timestamp) {
		this.player.update(timestamp);
	}
	
};