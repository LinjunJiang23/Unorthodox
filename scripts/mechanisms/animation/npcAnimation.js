// scripts/mechanisms/animation/npcAnimation.js

let npcAnimationSources = {
	baseBody: './img/animation/baseBody1.png'
};
let npcAnimationSpriteLoader = new SpriteLoader();
npcAnimationSpriteLoader.loadImages(npcAnimationSources);

let inFrameTime = 0;

/**
 * npcAnimation - a template class that centralizes all variable related to npc's animation
 * @var currentLocation: location, position: (x, y) 
 * @var currentState {string}
 * @var isMoving {boolean}
 * @var isIdle {boolean} 
 * @var currentFrame {number}
 * @var direction {string}
 * @var animationSpeed {number} 
 * @var lastUpdateTime {number} 
 * @var spriteSheets
 */
class npcAnimation {
	constructor(npc) {
		this.currentLocation = { 
			location: null, 
			position: {x: 0, y: 100} 
		},
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