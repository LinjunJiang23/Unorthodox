// src/spatial/spatialManager.js

class SpatialManager {
  constructor(eventManager) {
	this.entities = new Set();
	this.quadtree = new Quadtree(bounds);
  }
  
  batch_update() {
	
  }
  
  add_entity(entity) {
	if (!entity) this.eventManager.trigger('error', { type: 'param', message: 'Entity passed to add_entity in SpatialManager is empty.' });
  }
  
  init_events() {
	this.eventManager.on('createCharacter', (payload) => {
	  this.add_entity(payload.entity);
	});
	this.eventManager.on('itemSpawned', (payload) => {
	  this.add_entity(payload.entity);
	});
	this.eventManager.on('characterMoved', (payload) => {
	  this.update_entity(payload.entity);
	});
  }
}