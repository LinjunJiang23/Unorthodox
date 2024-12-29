// src/engine/environment/partition.js


/**
 * @class
 *  
 */
class Partition {
	constructor() {
		this.triggers = [];
		this.items = [];
		this.characters = [];
		this.weather = [];
	}
	
	addTrigger(trigger) {
		if (trigger instanceof BaseTriggerCollider) {
			this.triggers.push(trigger);
		}
	}
	
	addItem(item) {
		if (item instanceof Item) {
			this.items.push(item);
		}
	}
};