// src/characters/player/playerManager.js


class PlayerManager {
  constructor(characterManager) {
	this.characterManager = characterManager;
	this.create_player();
  }
  
  create_player() {
	this.player = new Player(this.characterManager.eventManager);
  }
  
  save_player_data() {
  }
	
  find_relationship(character, target) {
	this.player.relationshipManager.find_relationship_with(character, target);
  }
};