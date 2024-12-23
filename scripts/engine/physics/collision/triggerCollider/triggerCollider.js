// scripts/engine/physics/collision/triggerCollider/baseTriggerCollider.js

/**
 * @class
 */
class BaseTriggerCollider {
	constructor(physics, triggerZoneSize) {
		this.physics = physics;
		if (triggerZoneSize.maxX >= 0 && triggerZoneSize.maxY >= 0)
		  this.triggerZoneSize = triggerZoneSize;
	    this.objectsInRange = [];
	}
	
	onTriggerEnter(collider) {
		console.log(`${collider} entered the trigger zone at ${this.physics.x}, ${this.physics.y}!`);
		this.objectsInRange.push(collider);
		this.showInteractPrompt(true);
	}
	
	onTriggerExit(collider) {
		console.log(`${collider} entered the trigger zone at ${this.physics.x}, ${this.physics.y}!`);
		const index = this.objectsInRange.indexOf(collider);
		if (index !== -1) this.objectsInRange.splice(index, 1);
		
		//if (collider.tag === "player") {
			this.showInteractPrompt(false);
	}
	
	update() {
		const playerInRange = this.objectsInRange.find(obj => obj.tag === "player");
		
		if (playerInRange && isKeyPressed('KeyE')) this.interactWithPlayer(playerInRange);
	}
	
	interactWithPlayer(player) {
		
	}

	showInteractPrompt(show) {
		if (show) {
			$('#interact-prompt').css("display", "block");
			const x = (camera.mapToScreen(player.model.physics)).x + player.model.physics.width;
			console.log("This is the x: ", x);
			$('#interact-prompt').css('left', `${x}px`);
			const y = (camera.mapToScreen(player.model.physics)).y - player.model.physics.height;
			console.log('This is the y: ', y);
			$('#interact-prompt').css('top', `${y}px`);
		} else {
			$('#interact-prompt').css("display", "none");
		}
	}
};