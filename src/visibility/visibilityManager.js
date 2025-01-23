// src/engine/visibility/visibilityManager.js

/**
 * Manage calculation of what is visible within camera
 * @class
 */
class VisibilityManager {
  constructor(camera, eventManager) {
	this.camera = camera;
	this.eventManager = eventManager;
	this.visibleEntities = new Set();
	this.init_events();
  }
	
  get_triggers(triggers) {
	const cameraPos = camera.getPosition();
	const visibles = [];
	return triggers.filter(trigger => 
	  collisionManager.isCollided(trigger, position));
  }
	
  is_in_view(position, size) {
	return ( 
	  position.x + size.width > this.camera.x &&
	  position.x < this.camera.x + (this.camera.maxX - this.camera.minX) &&
	  position.y + size.height > this.camera.y &&
	  position.y < this.camera.y + (this.camera.maxY - this.camera.minY)
	);
  }
  
  update_visibility(position, size, id) {
	const result = this.is_in_view(position, size);
	if (result) {
	  if (!this.visibleEntities.has(id)) { 
	    this.visibleEntities.add(id);
		this.eventManager.trigger('updateVisibility', { id: id, visible: true });
	  }
	} else {
	  if (this.visibleEntities.has(id)) {
		this.visibleEntities.delete(id);
		this.eventManager.trigger('updateVisibility', { id: id, visible: false });
	  }
	}
  }
	
  sort_by_proximity(objects) {
  }
	
  highlight_objects(objects) {
	
  }
	
  handle_culling(objects) {
	
  }
  
  init_events() {
	this.eventManager.on('createCharacter', (payload) => {
	  const { bounds, id } = payload.entity;
	  if (bounds) {
	    this.update_visibility({ x: bounds.x, y: bounds.y }, 
		  { width: bounds.width, height: bounds.height }, id);		
	  }
	});
	this.eventManager.on('characterMoved', (payload) => {
	  const { bounds, id } = payload;
	  if (bounds) {
		this.update_visibility({ x: bounds.x, y: bounds.y }, 
		  { width: bounds.width, height: bounds.height }, id);
	  }
	});
  }
};