// src/characters/characterManager.js


class CharacterManager {
  constructor(eventManager) {
	this.eventManager = eventManager;
	this.player = new PlayerManager(this);
	this.specials = new SpecialCharacterManager(this);
	this.npcs = new NPCManager(this);
  }
	
  find_character(targetTag, targetID) {
	return this[targetTag].find(targetID);
  }
  
  create_character(characterTag, characterID) {
	if (characterTag === 'player' && characterID === 'player') 
	  this.player.create_player(characterID);
	if (characterTag === "specials") 
	  this.specials.create_specials(characterID);
	if (characterTag === "NPC") 
	  this.npcs.create_npc(characterID);
  }
  
  init_events() {
    this.eventManager.on('characterMoved', (payload) => {
	  const { bounds, tag, id } = payload;
	  this[tag].move_character(id, bounds.y, bounds.x);
	});
  }
};