// scripts/physics/collision/collision.js

function checkCollision(obj1, obj2) {
	return (
		obj1.x <= obj2.maxX &&
		obj1.maxX >= obj2.x && 
		obj1.y <= obj2.maxY &&
		obj1.maxY >= obj2.y
	);
};

function checkCollisionInActiveSections(newX, newY) {
	const activeSections = envManager.getActiveSections(newX, newY);
	for (let activeSection of activeSections) {
		if (activeSection.staticCollision) {
			for (let staticC of activeSection.staticCollision) { 
			  let [staticX, staticY] = staticC.split(',').map(Number);
			  const obj2 = {
				  x: staticX * 16, 
				  y: staticY * 16, 
				  maxX: staticX * 16 + 16, 
				  maxY: staticY * 16 + 16
			  };
			  
			  const pWidth = player.model.physics.width / 2;
			  const pHeight = player.model.physics.height / 2;
			  
			  const newPos = {
				  x: newX - pWidth,
				  y: newY - pHeight,
				  maxX: newX + pWidth,
				  maxY: newY + pHeight
			  };
			  			  
			  if (checkCollision(newPos, obj2)) {
				return true;
				break;
			  }
			}
		}
	}
	return false;
};