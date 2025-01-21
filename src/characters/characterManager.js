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
};