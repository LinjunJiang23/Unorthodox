// src/characters/characterManager.js

class CharacterManager {
  constructor(eventManager) {
	this.eventManager = eventManager;
	this.player = new PlayerManager(this);
	this.specials = new SpecialCharacterManager(this);
	this.npcs = new NPCManager(this);
  }
	
  find_character(target) {
	const { tag, id } = target;
	return this[targetTag].find_character(targetID);
  }
  
  create_character(character) {
	this[characterTag].create_character(characterID);
  }
  
  destroy_character(characterTag, characterID) {
	this[characterTag].destroy_character(characterID);
  }
  
  init_events() {
    this.eventManager.on('characterMoved', (payload) => {
	  const { bounds } = payload;
	  this[bounds.tag].move_character(bounds.id, bounds.y, bounds.x);
	});
  }
  
  find_relationship(character, target) {
	const { tag, id } = character;
	return this[tag].find_relationship(id, target);
  }
  
  find_stat(character) {
    const { tag, id } = character;
	return this[tag].find_stat(id);
  }
  
};