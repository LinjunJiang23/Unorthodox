// scripts/mechanisms/inventory/item.js

let item_id = 0;

/**
 * Item class
 * @param {string} name
 * @param {string} description
 * @param {number} weight
 * @param {number} quantity
 * @param {Array} itemTags
 * @param {boolean} stackable
 * setQuantity, getTotalWeight
 */
class Item {
	constructor(name, description, weight, quantity, 
				itemTags, img_src, stackable = true) {
		
		if (typeof name === "string") this.name = name;
		
		if (typeof description === "string") this.description = description;
		
		if (typeof weight === "number" && weight > 0) this.weight = weight;
		
		if (typeof quantity === "number" && 
			quantity < 100 && quantity > 1) this.quantity = quantity;
		
		if (typeof stackable === "boolean") this.stackable = stackable;
		
		if (typeof itemTags === "object") { 
			let validTag = true;
			itemTags.forEach(tag => {
				if (!(tag instanceof ItemTag && existing_tags.find(cur => cur === tag))) {
					console.log(`Tag: ${tag.name} not found.`);
					validTag = false;
					return;
				}
			});
			if (validTag) this.itemTags = itemTags;
		}
		
		if (typeof img_src === "string") {
			this.img_src = img_src;
		}
		
		this.item_id = item_id;
		item_id++;
		
		this.total_weight = (this.weight * this.quantity);
	}
	
	/* Start of SETTERs */
	setQuantity(quantity) {
		if (typeof quantity === "number" && 
			quantity < 100 && quantity > 1) this.quantity = quantity;
		this.total_weight = (this.weight * this.quantity);
	}
	/* End of SETTERs*/

	/* Start of GETTERs */
	getQuantity() {
		return this.quantity;
	}
	
	getTotalWeight() {
		return this.total_weight;
	}
	
	isStackable() {
		return this.stackable;
	}
	
	getItemWeight() {
		return this.weight;
	}
	/* End of GETTERs*/
	
};