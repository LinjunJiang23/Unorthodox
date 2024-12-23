// scripts/engine/physics/collision/checkCollision.js

function checkCollision(obj1, obj2) {
	return (
		obj1.x <= obj2.maxX &&
		obj1.maxX >= obj2.x && 
		obj1.y <= obj2.maxY &&
		obj1.maxY >= obj2.y
	);
};