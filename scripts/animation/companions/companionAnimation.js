// scripts/mechanisms/animation/caracterAnimation.js

/**
 * Centralizes all variable related to companions' animation
 * @property {string} state 
 * @property {string} action
 * @property {number} currentFrame
 * @property {string} direction
 * @property {number} animationSpeed 
 * @property {number} lastUpdateTime 
 * @property spriteSheets
 */
class CompanionAnimation extends BaseAnimation {
	static validStates = ['walk', 'run', 'idle', 'backup'];
	static validActions = ['rest', 'hold', 'battle', 'lift'];
	
	constructor(character) {
		super(character);
		this.init();
	}
	
	init() {
		const animationSpriteLoader = new SpriteLoader();
		if (this.character.type === "player") {
			const playerAnimationSources = {
				baseBody: `./img/animation/baseBody${this.character.app.baseBody}.png`
			};
			animationSpriteLoader.loadImages(playerAnimationSources);
		} else {
		}
		this.spriteSheets = animationSpriteLoader.getSpriteSheets();
		this.physics = new PhysicsObject(0, 0, 32, 32);
	}
	
	changeState(state) {
		if (CompanionAnimation.validStates.includes(state)) {
			switch (state) {
				case 'walk':
					if (this.animationSpeed !== 140) this.animationSpeed = 140;
					if (this.state !== 'walk') this.state = "walk";
					break;
				case 'idle':
					if (this.state !== "idle") this.state = 'idle';
					if (this.animationSpeed !== 540) this.animationSpeed = 540;
			}
		}
	}
	
	updateAnimation(timestamp) {
		if (timestamp - this.lastUpdateTime > this.animationSpeed) {
			if (this.state === "idle" && this.idleTime > 300000) {
				console.log('Idle action animations should trigger after player being idle for 5 min');
			}
			this.currentFrame = (this.currentFrame + 1) % playerFrames[this.direction][this.state]['baseBody'].length;
			this.lastUpdateTime = timestamp; 
		}
		this.render();
	}
	
	render() {
		const ctx = getCTX('characters');
		const intendedSpritePos = 
		playerFrames[this.direction][this.state]['baseBody'][this.currentFrame];
		drawFrame(ctx, this.spriteSheets, intendedSpritePos, camera.mapToScreen(this.physics));
	}
};

