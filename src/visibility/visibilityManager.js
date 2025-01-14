// src/engine/visibility/visibilityManager.js

/**
 * Manage all visible component within camera
 * @class
 */
class VisibilityManager {
  constructor(camera) {
	this.camera = camera;
	this.visibleEntities = new Set();
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
	
  sortByProximity(objects) {
  }
	
  highlightObjects(objects) {
  }
	
  handleCulling(objects) {
  }
};