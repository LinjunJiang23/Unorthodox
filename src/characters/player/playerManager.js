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
  
  move_character(id, newX, newY) {
    //If allow multi player in the future will search player using the id
	this.player.model.physics.x = newX;
	this.player.model.physics.y = newY;
  }
};