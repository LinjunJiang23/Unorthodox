// src/characters/player/playerManager.js


class PlayerManager {
  constructor(characterManager) {
	this.characterManager = characterManager;
	this.create_character('player');
  }
  
  create_character(id) {
	this.player = new Player(this.characterManager.eventManager);
	this.characterManager.eventManager.trigger('createCharacter', { 
	  character: this.player, entity: { bounds: { 
		x: this.player.model.animation.x,
		y: this.player.model.animation.y,
		width: this.player.model.animation.width,
		height: this.player.model.animation.height
	  },
	  id: this.player.id 
	}});
	this.characterManager.eventManager.trigger('switchLeaderControl', { character: this.player });
  }
  
  destroy_character(id) {
	delete this.player;
  }
  
  save_player_data() {
  }
	
  find_relationship(character, target) {
	this.player.relationships.find_relation_with(target);
  }
  
  move_character(id, newX, newY) {
    //If allow multi player in the future will search player using the id
	this.player.change_physical_position(newX, newY);
  }
  
  find_character(id) {
	return this.player;
  }
  
  find_stat(id) {
	return this.player.stat;
  }
  
};