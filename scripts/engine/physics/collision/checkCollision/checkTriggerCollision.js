// scripts/engine/physics/collision/checkCollision/checkTriggerCollision.JSON

function checkTriggerCollisions() {
	triggerColliders.forEach(trigger => {
		const other = {
			x: trigger.physics.x, 
			y: trigger.physics.y, 
			maxX: trigger.physics.x + trigger.triggerZoneSize.maxX, 
			maxY: trigger.physics.y + trigger.triggerZoneSize.maxY};
		const o = {
			x: player.model.physics.x,
			y: player.model.physics.y,
			maxX: player.model.physics.x + player.model.physics.width,
			maxY: player.model.physics.y + player.model.physics.height
		};
		if (checkCollision(o, other)) {
			if (!trigger.objectsInRange.includes(player)) trigger.onTriggerEnter(player);
		} else {
			if (trigger.objectsInRange.includes(player)) {
				trigger.onTriggerExit(player);
			}
		}
	});
};