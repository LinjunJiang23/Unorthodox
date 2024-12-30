// scripts/engine/physics/collision/triggerCollider/triggerManager.js

class TriggerManager {
	constructor() {
		if (TriggerManager.instance) {
			return TriggerManager.instance;
		}
		TriggerManager.instance = this;
		this.triggers = [];
		this.visibleTriggers = [];
	}
	
	addTrigger(newTrigger) {
		if (newTrigger instanceof TriggerCollider) {
			this.triggers.push(newTrigger);
		} else {
			console.log("Input is not not a trigger collider.");
		}
	}
	
	checkCollisionsInView(position, object) {
		this.visibleTriggers = VisibilityManager.getVisibleTriggers(this.triggers);
		this.visibleTriggers.forEach(trigger => CollisionManager.checkTriggerCollisions(trigger, position, object));
	}
	
	getVisibleTriggers() {
	}
	
	getInteractableTriggers() {
	}
	
};

const triggerManager = new TriggerManager();