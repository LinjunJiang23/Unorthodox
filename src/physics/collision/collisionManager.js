// src/engine/physics/collision/collisionManager.js

class CollisionManager {
	static isCollided(obj1, obj2) {
	  return (
		obj1.minX <= obj2.maxX &&
		obj1.maxX >= obj2.minX && 
		obj1.minY <= obj2.maxY &&
		obj1.maxY >= obj2.minY
	  );
	}
	
	static isTriggerCollided(trigger, position) {
		if (trigger instanceof BaseTriggerCollider) {
			if (CollisionManager.isCollided(position, trigger.physics)) {
				return true;
			}
			return false;
		}
		return false;
	}
	
	static checkCollisionInActiveSections(obj1) {
		const activeSections = envManager.getActiveSections(obj1);
		for (let activeSection of activeSections) {
			if (activeSection.staticCollision) {
				for (let staticC of activeSection.staticCollision) { 
				  let [staticX, staticY] = staticC.split(',').map(Number);
				  const obj2 = {
					  minX: staticX * 16, 
					  minY: staticY * 16, 
					  maxX: staticX * 16 + 16, 
					  maxY: staticY * 16 + 16
				  };
				  
				  const o = {
					 minX: obj1.x - obj1.width / 2,
					 minY: obj1.y - obj1.height / 2,
					 maxX: obj1.x + obj1.width / 2,
					 maxY: obj1.y + obj1.width / 2
				  };
				  
				  if (CollisionManager.isCollided(o, obj2)) {
					return true;
				  }
				}
			}
		}
		return false;
	}
	
	static checkTriggerCollisions(trigger, position, object) {
		if (CollisionManager.isCollided(trigger, position)) {
			if (!trigger.objectsInRange.includes(object)) {
			trigger.onTriggerEnter(object);
			} else {
				if (trigger.objectsInRange.includes(object)) 
				trigger.onTriggerExit(object);
			}
		}
	}
	
	
};