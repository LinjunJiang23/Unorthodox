// src/spatial/spatialManager.js

class SpatialManager {
  constructor(eventManager) {
	this.eventManager = eventManager;
	this.quadtree = new Quadtree(bounds);
  }
  
  batch_update() {
	
  }
  
  update_quadtree(entity) {
	if (this.entities.has(entity)) {
	  this.quadtree.update(entity);
	} else {
	  this.quadtree.add(entity);
	}
  }
  
  add_entity(entity) {
	if (!entity) this.eventManager.trigger('error', { type: 'param', message: 'Entity passed to add_entity in SpatialManager is empty.' });
	this.entities.add(entity);
  }
  
  init_events() {
	this.eventManager.on('createCharacter', (payload) => {
	  this.add_entity(payload.entity);
	});
	this.eventManager.on('itemSpawned', (payload) => {
	  this.add_entity(payload.entity);
	});
	this.eventManager.on('characterMoved', (payload) => {
	  this.update_quadtree(payload.entity);
	});
	this.eventManager.on('unlockArea', (payload) => {
	  const { bounds } = payload;
	});
  }
  
  destroy() {
    this.eventManager.off('createCharacter');
    this.eventManager.off('itemSpawned');
    this.eventManager.off('characterMoved');
  }
};