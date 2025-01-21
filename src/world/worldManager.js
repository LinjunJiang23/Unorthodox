class WorldManager {
  constructor(eventManager) {
	this.eventManager = eventManager;
	this.world = new World(this.eventManager);
  }
  
  init_events() {
  }
  
};