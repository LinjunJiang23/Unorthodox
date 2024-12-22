// scripts/mechanisms/animation/npcAnimation.js

/**
 * Centralizes all aspects related to npc's animation, including current location, current state, 
 * current action state, is moving, is idle, current frame for animation, direction of animation, 
 * last update time for frame, and sprite sheets for the npc(s).
 * @class
 * @summary   Animation for NPCs.
 *
 * @property {Object} currentLocation
 * @property {string} state
 * @property {string} action 
 * @property {number} currentFrame 
 * @property {string} direction 
 * @property {number} animationSpeed 
 * @property {number} lastUpdateTime 
 * @property spriteSheets
 */
class npcAnimation extends BaseAnimation {
	static validStates = ['walk', 'run', 'idle'];
	static validActions = ['rest', 'hold', 'battle', 'lift'];
	
	constructor(character) {
		super(character);
		this.init();
	}
	
	init() {
		/** @todo Need to change this to npc sprite sheets*/
		const npcAnimationSources = { baseBody: `./img/animation/NPC/${this.character.type}/baseBody1.png`};
		const npcAnimationSpriteLoader = new SpriteLoader();
		npcAnimationSpriteLoader.loadImages(npcAnimationSources);
		this.spriteSheets = npcAnimationSpriteLoader.getSpriteSheets();
		this.physics = new PhysicsObject(0, 0, 32, 32);
		this.inViewportTime = 0;
	}
	
	isInViewport() {
		const sPosition = camera.mapToScreen({x: this.physics.x, y: this.physics.y});
		if (
			sPosition.x + this.physics.width > 0  &&
			sPosition.y + this.physics.height > 0 && 
			sPosition.x < viewportSize.width &&
			sPosition.y < viewportSize.height
		) return true;
		return false;
	}
	
	changeState(state) {
		if (npcAnimation.validStates.includes(state)) {
			(this.state !== state) ? this.state = state : console.log("State remains the same: ", this.state);
		} else {
			console.log('State :', state, " not found!");
		}
	}
	
	changeAction(action) {
		if (npcAnimation.validActions.includes(action)) {
			(this.action !== action) ? this.action = action : console.log('Action remains the same: ', this.action);
		} else {
			console.log("Action: ", action, " not found!");
		}
	}
	
	updateAnimation(timestamp) {
		const _check = this.isInViewport();
		if (_check) {
		  if ((timestamp - this.lastUpdateTime) > this.animationSpeed) {
			if (this.state === "idle") {
				if (this.inViewportTime > 300000) {
					console.log('Idle action animations should trigger after player being idle for 5 min');
				} 
			}
			this.currentFrame = (this.currentFrame + 1) % npcFrames[this.direction][this.state]['baseBody'].length;
			this.lastUpdateTime = timestamp;
		  }
		  this.render();
		}
	}
	
	render() {
		const ctx = getCTX('interactable');
		let npcPosition = {x: this.physics.x, y: this.physics.y};
		/** 
		 * @todo Haven't finished drawing npc sprite sheets, should replace with npc sprites later on
		 */
		const intendedSpritePos = 
		npcFrames[this.direction][this.state]['baseBody'][this.currentFrame];
		drawFrame(ctx, this.spriteSheets, intendedSpritePos, camera.mapToScreen(npcPosition));
	}
	
};