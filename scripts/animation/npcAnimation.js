// scripts/mechanisms/animation/npcAnimation.js

let npcAnimationSources = {
	baseBody: './img/animation/baseBody1.png'
};
let npcAnimationSpriteLoader = new SpriteLoader();
npcAnimationSpriteLoader.loadImages(npcAnimationSources);

let inFrameTime = 0;

/**
 * Centralizes all aspects related to npc's animation, including current location, current state, 
 * current action state, is moving, is idle, current frame for animation, direction of animation, 
 * last update time for frame, and sprite sheets for the npc(s).
 * @class
 * @summary Animation for NPCs.
 *
 * @property {Object} currentLocation
 * @property {string} currentState 
 * @property {boolean} isMoving 
 * @property {boolean} isIdle 
 * @property {number} currentFrame 
 * @property {string} direction 
 * @property {number} animationSpeed 
 * @property {number} lastUpdateTime 
 * @property spriteSheets
 */
class npcAnimation {
	constructor() {
		this.x = 0;
		this.y = 0;
		this.currentState = 'idle',
		this.direction = 'down',
		this.isMoving = false;
		this.isIdle = true;
		this.currentFrame = 0;
		this.animationSpeed = 440;
		this.lastUpdateTime = 0;
		this.spriteSheets;
	}
	
	updateAnimation(timestamp) {
		if (this.isMoving) {
			if ((timestamp - this.lastUpdateTime) > this.animationSpeed) {
				this.currentFrame = (this.currentFrame + 1) % npcAnimationSpriteSheets[this.direction]['walk']['baseBody'].length;
				this.lastUpdateTime = timestamp;
			}
		} else if (this.isIdle) {
			if (timestamp - this.lastUpdateTime > this.animationSpeed) {
				if (inFrameTime > 300000) {
					//Idle action animations should trigger after player being idle for 5 min
				} else {
					this.currentFrame = (this.currentFrame + 1) % npcAnimationSpriteSheets[this.direction]['idle']['baseBody'].length;
					this.lastUpdateTime = timestamp;
				}
			}
		}
		this.render();
	}
	
	render() {
		const ctx = getCTX('interactable');
	}
	
	isInViewport() {
	}
};