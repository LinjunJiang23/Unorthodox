// scripts/mechanisms/animation/caracterChibi.js

let characterAnimationSources = {
	baseBody: './img/animation/baseBody1.png'
};
let animationSpriteLoader = new SpriteLoader();
animationSpriteLoader.loadImages(characterAnimationSources);

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
	
	updateAnimation(timestamp) {
		if (this.isMoving) {
			if ((timestamp - this.lastUpdateTime) > this.animationSpeed) {
				this.currentFrame = (this.currentFrame + 1) % animationSpriteSheets[this.direction]['walk']['baseBody'].length;
				this.lastUpdateTime = timestamp;
			}
		} else if (this.isIdle) {
			if (timestamp - this.lastUpdateTime > this.animationSpeed) {
				this.currentFrame = (this.currentFrame + 1) % animationSpriteSheets[this.direction]['idle']['baseBody'].length;
				this.lastUpdateTime = timestamp;
			}
		}
		this.render();
	}
	
	render() {
		const ctx = getCTX('player');
		const intendedSpritePos = animationSpriteSheets[this.direction][this.currentState]['baseBody'][this.currentFrame];
		drawFrame(ctx, this.spriteSheets, intendedSpritePos, playerPosition);
	}
	
	stop() {
		this.isMoving = false;
		this.currentState = 'idle';
		this.isIdle = true;
		this.animationSpeed = 440;
	}
};

let playerAnimation = new PlayerAnimation();

function gameLoop(timestamp) {
    playerAnimation.updateAnimation(timestamp);
    requestAnimationFrame(gameLoop);
}

requestAnimationFrame(gameLoop);