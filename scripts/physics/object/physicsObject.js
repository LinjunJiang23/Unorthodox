// scripts/physics/object/physicsObject.js

/**
 * PhysicsObject - A template class that defines the basic physics in objects
 * @property {number} x
 * @property {number} y
 * @property {number} z
 * @property {number} width
 * @property {number} height
 * @property {number} maxX - x + width
 * @property {number} maxY - y + height
 * @property {boolean} isStatic
 * @property {object} velocity
 * @property {object} acceleration
 */
class PhysicsObject {
	static validTypes = ['rect', 'circle', 'polygon'];
	
	
	constructor(x, y, width, height, isStatic = false, type = "rect") {
		(typeof x === "number" && x >= 0) ? this.x = x : this.x = 0;
		(typeof y === "number" && y >= 0) ? this.y = y : this.y = 0;
		this.z = 0;
		(typeof width === "number" && width >= 0) ? this.width = width : this.width = 0;
		(typeof height === "number" && height >= 0) ? this.height = height : this.height = 0;
		this.isStatic = isStatic;
		(PhysicsObject.validTypes.includes(type)) ? this.type = type : this.type = 'rect';
		this.velocity = {x: 0, y: 0};
		this.acceleration = {x: 0, y: 0};
	}
	
	applyForce(force) {
		if (!this.isStatic) {
			this.acceleration.x += force.x;
			this.acceleration.y += force.y;
			console.log(this.acceleration);
		}
	}
	
	update(deltaTime) {
		if (!this.isStatic) {
			this.velocity.x += this.acceleration.x * deltaTime;
			this.velocity.y += this.acceleration.y * deltaTime;
			this.x += this.velocity.x * deltaTime;
			this.y += this.velocity.x * deltaTime;
			this.acceleration.x = 0;
			this.acceleration.y = 0;
		}
	}
};

