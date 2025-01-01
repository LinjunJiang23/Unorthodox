// src/world/partition.js


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
	
	add_trigger(trigger) {
		if (trigger instanceof BaseTriggerCollider) {
			this.triggers.push(trigger);
		}
	}
	
	add_item(item) {
		if (item instanceof Item) {
			this.items.push(item);
		}
	}
	
	
};