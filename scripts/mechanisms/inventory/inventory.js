// scripts/mechanisms/inventory/inventory.js

const goldChanged = new CustomEvent('inventoryStateUpdated', 
					{ detail: "gold" });
const inventoryChanged = new CustomEvent('inventoryStateUpdated', 
					{ detail: "inventory" });


/**
 * Inventory
 * addItems, clearItems
 */
class Inventory {
	constructor() {
		this.slots = new Map();
		this.size = 36;
		this.current_weight = 0;
		this.max_weight = 50;
	}
	
	addItem(slot_id, item, quantity) {
		if (item instanceof Item) {
			let total_weight = item.getTotalWeight();
			if ((total_weight + current_weight) <= max_weight) {
				this.slots.set(item.name, item);
				this.current_weight += total_weight;
			}
		}
	}
	
	clearAllItems() {
		this.items.clear();
	}
	
	dropItem(slot_id, item, quantity) {
		if (item instanceof Item) {
			let total_weight = item.getTotalWeight();
			this.current_weight -= total_weight;
			this.slots.delete(item.name);
		}
	}
	
	/* Start of SETTERs */
	setSize(size) {
		if (typeof size === "number") {
			this.size = size;
		}
	}
	
	setMaxWeight(max_weight) {
		if (typeof max_weight === "number") {
			this.max_weight = max_weight;
		}
	}
	/* End of SETTERs */
	
	/* Start of GETTERs */
	getSize() {
		return this.size;
	}
	
	getInventoryWeight() {
		return this.current_weight;
	}
	
	getMaxWeight() {
		return this.max_weight;
	}
	/* End of GETTERs */
	
};


/**
 */
const miniInventoryUI = () => {
	$('#inventory-horizontal').append(
	    `<div id="inventory-minislot1">
		  <svg width="500" height="100">
		    <rect x="200" y="0" width="50" height="50" fill="lightgray" stroke="black" fill-opacity="0.3"></rect>
		    <text id="item1" x="200" y="20" width="50" height="50" draggable="true">物品2</text>		  
			<rect x="250" y="0" width="50" height="50" fill="lightgray" stroke="black" fill-opacity="0.3"></rect>
			<text id="item1" x=250" y="20" width="50" height="50" draggable="true">物品1</text>			
		  </svg>
		</div>`);
};

/**
 */
function updateInventoryState(e) {
  console.log("inventory update triggered");
  const target = $('*[class^=display]').find(`*[class*=${e.detail}]`);
  setTimeout(() => {
    target.text("Health: " + window.$health);
  }, 100);
};


$(document).on('click', '#inventory-mini-icon', function() {
	$
});
document.addEventListener('inventoryStateUpdated', updateInventoryState);
