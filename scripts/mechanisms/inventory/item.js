let item_id = 0;
/**
 * Item class
 * setQuantity, getTotalWeight
 */
class Item {
	constructor(name, description, weight, quantity, stackable = true) {
		if (typeof name === "string") this.name = name;
		if (typeof description === "string") this.description = description;
		if (typeof weight === "number" && weight > 0) this.weight = weight;
		if (typeof stackable === "boolean") this.stackable = stackable;
		if (typeof quantity === "number" && 
			quantity < 100 && quantity > 1) this.quantity = quantity;
		this.item_id = item_id;
		item_id++;
		this.total_weight = (this.weight * this.quantity);
	}
	
	setQuantity(quantity) {
		if (typeof quantity === "number" && 
			quantity < 100 && quantity > 1) this.quantity = quantity;
		this.total_weight = (this.weight * this.quantity);
	}
	
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
};