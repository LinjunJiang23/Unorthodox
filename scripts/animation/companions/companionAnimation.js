// scripts/animation/companions/companionAnimation.js

/**
 * Centralizes all variable related to companions' animation
 * @static validStates - idle, walk, run, backup, jump
 * @static validActions - rest, hold, battle, lift, drop, drag
 */
class CompanionAnimation extends BaseAnimation {
	static validStates = ['idle', 'walk', 'run', 'backup', 'jump'];
	static validActions = ['rest', 'hold', 'battle', 'lift', 'drop', 'drag'];
	
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
			this.physics = new PhysicsObject(0, 0, 32, 32);
			this.frameSheet = playerFrames;
		} else {
			const companionAnimationSources = {
				baseBody: `./img/animation/companions/${type}/baseBody.png`
			};
			animationSpriteLoader.loadImages(companionAnimationSources);
			/** @todo Different companions should have different width and height in physics. */
			this.physics = new PhysicsObject(0, 0, 32, 32);
			/** @todo Different companions should have different frame sheets. */
			this.frameSheet = playerFrames;
		}
		this.spriteSheets = animationSpriteLoader.getSpriteSheets();
	}
	
	changeState(state) {
		if (CompanionAnimation.validStates.includes(state)) {
			switch (state) {
				case 'walk':
					if (this.animationSpeed !== 140) this.animationSpeed = 140;
					if (this.state !== 'walk') this.state = "walk";
					break;
				case 'run':
					if (this.animationSpeed !== 140) this.animationSpeed = 140;
					if (this.state !== 'run') this.state = "run";
					break;
				case 'backup':
					if (this.animationSpeed !== 140) this.animationSpeed = 140;
					if (this.state !== 'backup') this.state = "backup";
					break;
				case 'jump':
					if (this.animationSpeed !== 140) this.animationSpeed = 140;
					if (this.state !== 'jump') this.state = "jump";
					break;
				default:
					if (this.state !== "idle") this.state = 'idle';
					if (this.animationSpeed !== 540) this.animationSpeed = 540;
					break;
					
			}
		}
	}
	
	changeAction(action) {
		if (CompanionAnimation.validActions.includes(action)) {
			switch(state) {
				default:
					if (this.action !== "rest") this.action = 'rest';
					break;
			}
		}
	}
	
	render() {
		super.render();
		const ctx = getCTX('characters');
		const intendedSpritePos = 
		this.frameSheet[this.direction][this.state]['baseBody'][this.currentFrame];
		drawFrame(ctx, this.spriteSheets, intendedSpritePos, camera.mapToScreen(this.physics));
	}
};

