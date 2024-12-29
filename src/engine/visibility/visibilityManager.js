// src/engine/visibility/visibilityManager.js

/**
 * Manage all visible component within camera
 * @class
 */
class VisibilityManager {
	
	static getVisibleTriggers(triggers) {
		const cameraPos = camera.getPosition();
		const visibles = [];
		return triggers.filter(trigger => 
			CollisionManager.isCollided(trigger, position));
	}
	
	static isTriggerInView() {
	}
	
	static isObjectsInView(item) {
		
	}
	
	static sortByProximity(objects) {
	}
	
	static highlightObjects(objects) {
	}
	
	static handleCulling(objects) {
	}
	
};