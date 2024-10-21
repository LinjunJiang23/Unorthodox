const goldChanged = new CustomEvent('inventoryStateUpdated', { detail: "gold" });
const inventoryChanged = new CustomEvent('inventoryStateUpdated', { detail: "inventory" });


/**
 * Inventory
 * addItems, clearItems
 */
class Inventory {
	constructor() {
		this.items = new Map();
		this.size = 36;
		this.current_weight = 0;
		this.max_weight = 50;
	}
	
	addItem(item) {
		if (item instanceof Item) {
			let total_weight = item.getTotalWeight();
			if ((total_weight + current_weight) <= max_weight) {
				this.items.set(item.name, item);
				this.current_weight += total_weight;
			}
		}
	}
	
	clearItems() {
		this.items.clear();
	}
	
	dropItem(item) {
		if (item instanceof Item) {
			let total_weight = item.getTotalWeight();
			this.current_weight -= total_weight;
			this.items.delete(item.name);
		}
	}
};

function drag(ev) {
	ev.dataTransfer.setData('text', ev.target.id);
};

function allowDrop(ev) {
	ev.preventDefault();
};

function drop(ev) {
	ev.preventDefault();
	var data = ev.dataTransfer.getData('text');
	var draggedItem = document.getElementById(data);
	
	if (ev.target.tagName === 'DIV') {
		ev.target.appendChild(draggedItem);
	} else if (ev.target.parentElement.tagName === "DIV") {
		ev.target.appendChild(draggedItem);
	}
};

const miniInventoryUI = () => {
	$('#inventory-horizontal').append(
	    `<div ondrop="drop(event)" ondragover="allowDrop(event)" id="inventory-minislot1">
		  <svg width="500" height="100">
		    <rect x="0" y="0" width="50" height="50" fill="lightgray" stroke="black" fill-opacity="0.3"></rect>
		    <image id="item1" href="./img/items/item.png" x="0" y="0" width="50" height="50" draggable="true" ondragstart="drag(event)"></image>		  
		  </svg>
		</div>`);
};

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
