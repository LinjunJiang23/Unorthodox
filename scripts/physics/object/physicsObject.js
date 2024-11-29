// scripts/physics/object/physicsObject.js

/**
 * PhysicsObject - A template class that defines the basic physics in objects
 * @var {number} x
 * @var {number} y
 * @var {number} width
 * @var {number} height
 * @var {number} maxX - x + width
 * @var {number} maxY - y + height
 * @var {boolean} isStatic
 * @var {object} velocity
 * @var {object} acceleration
 */
class PhysicsObject {
	constructor(x, y, width, height, isStatic = false) {
		(typeof x === "number" && x >= 0) ? this.x = x : this.x = 0;
		(typeof y === "number" && y >= 0) ? this.y = y : this.y = 0;
		(typeof width === "number" && width >= 0) ? this.width = width : this.width = 0;
		(typeof height === "number" && height >= 0) ? this.height = height : this.height = 0;
		this.isStatic = isStatic;
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

function checkCollision(obj1, obj2) {

	return (
		obj1.x <= obj2.maxX &&
		obj1.maxX >= obj2.x && 
		obj1.y <= obj2.maxY &&
		obj1.maxY >= obj2.y
	);
};

let playerPosition = new PhysicsObject(0, 0, 32, 32);
