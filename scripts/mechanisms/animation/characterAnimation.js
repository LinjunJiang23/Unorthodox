// scripts/mechanisms/animation/caracterChibi.js


let characterAnimationSources = {
	baseBody: './img/animation/baseBody1.png'
};
let animationSpriteLoader = new SpriteLoader();
animationSpriteLoader.loadImages(characterAnimationSources);

let idleTime = 0;

/**
 * PlayerAnimation - a singleton class that centralizes all variable related to player's animation
 * @var currentState {string}
 * @var isMoving {boolean}
 * @var isIdle {boolean} 
 * @var currentFrame {number}
 * @var direction {string}
 * @var animationSpeed {number} 
 * @var lastUpdateTime {number} 
 * @var spriteSheets
 */
class PlayerAnimation {
	constructor() {
		if (PlayerAnimation.instance) {
			return PlayerAnimation.instance;
		}
		PlayerAnimation.instance = this;		
		this.currentState = 'idle';
		this.isMoving = false;
		this.isIdle = true;
		this.currentFrame = 0;
		this.direction = "down";
		this.animationSpeed = 440;
		this.lastUpdateTime = 0;
		this.spriteSheets = animationSpriteLoader.getSpriteSheets();
	}
	
	changeState(state, direction) {
		const validStates = ['walk'];
		const validDirections = ['left', 'up', 'right', 'down'];
		if (validStates.includes(state) && validDirections.includes(direction)) {
			switch (state) {
				case 'walk':
					if (this.direction !== direction) this.direction = direction;
					if (!this.isMoving) this.isMoving = true;
					if (this.isIdle) this.isIdle = false;
					if (this.animationSpeed !== 140) this.animationSpeed = 140;
					if (this.currentState !== 'walk') this.currentState = "walk";
					break;
			}
		}
	}
	
	updateAnimation(timestamp) {
		if (this.isMoving) {
			if ((timestamp - this.lastUpdateTime) > this.animationSpeed) {
				this.currentFrame = (this.currentFrame + 1) % animationSpriteSheets[this.direction]['walk']['baseBody'].length;
				this.lastUpdateTime = timestamp;
			}
		} else if (this.isIdle) {
			if (timestamp - this.lastUpdateTime > this.animationSpeed) {
				if (idleTime > 300000) {
					//Idle action animations should trigger after player being idle for 5 min
				} else {
					this.currentFrame = (this.currentFrame + 1) % animationSpriteSheets[this.direction]['idle']['baseBody'].length;
					this.lastUpdateTime = timestamp;
				}
			}
		}
		this.render();
	}
	
	render() {
		const ctx = getCTX('player');
		const intendedSpritePos = 
		animationSpriteSheets[this.direction][this.currentState]['baseBody'][this.currentFrame];
		drawFrame(ctx, this.spriteSheets, intendedSpritePos, camera.mapToScreen(playerPosition));
	}
	
	idle() {
		if (this.isMoving) this.isMoving = false;
		if (this.currentState !== 'idle') this.currentState = 'idle';
		if (!this.isIdle) this.isIdle = true;
		if (this.animationSpeed !== 540) this.animationSpeed = 540;
		this.render();
	}
};

let playerAnimation = new PlayerAnimation();

