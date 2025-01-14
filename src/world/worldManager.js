class WorldManager {
  constructor(eventManager) {
	this.eventManager = eventManager;
  }
  
  init_events() {
	this.eventManager.on('createCharacter', (payload) => {
	  this.add_entity(payload.character);
	});
	this.eventManager.on('itemSpawned', (payload) => {
	  this.add_entity(payload.item);
	});
	this.eventManager.on('characterMoved', (payload) => {
	  
	});
  }
  
};