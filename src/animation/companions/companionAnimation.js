// scripts/animation/companions/companionAnimation.js

/**
 * Centralizes all variable related to companions' animation
 * @static validStates - idle, walk, run, backup, jump
 * @static validActions - rest, hold, battle, lift, drop, drag
 */
class CompanionAnimation extends BaseAnimation {
	static validStates = ['idle', 'walk', 'run', 'backup', 'jump'];
	static validActions = ['rest', 'hold', 'lift', 'drop', 'drag'];
	
	constructor(character) {
		super(character);
		this.init();
	}
	
	init() {
		let animationSpriteLoader = new SpriteLoader();
		if (this.character.tag === "player") {
			const playerAnimationSources = {
				baseBody: `./img/animation/companions/player/${this.mode}/baseBody${this.character.app.baseBody}.png`
			};
			animationSpriteLoader.loadImages(playerAnimationSources);
			this.physics = new PhysicsCollider(0, 0, 32, 32);
			this.frameSheet = playerFrames;
		} else {
			const companionAnimationSources = {
				baseBody: `./img/animation/companions/${this.character.tag}/${this.mode}/baseBody.png`
			};
			animationSpriteLoader.loadImages(companionAnimationSources);
			/** @todo Different companions should have different width and height in physics. */
			this.physics = new PhysicsCollider(0, 0, 32, 32);
			/** @todo Different companions should have different frame sheets. */
			this.frameSheet = playerFrames;
		}
		this.spriteSheets = animationSpriteLoader.getSpriteSheets();
		animationSpriteLoader = null;
	}
	
	set_mode(mode) {
		if (CompanionAnimation.validModes.includes(mode)) {
			if (this.mode !== mode) {
				this.mode = mode;
				let animationSpriteLoader = new SpriteLoader();
				if (this.character.tag === "player") {
					const playerAnimationSources = {
					baseBody: `./img/animation/companions/player/${this.mode}/baseBody${this.character.app.baseBody}.png`
					};
					animationSpriteLoader.loadImages(playerAnimationSources);
				} else {
					const companionAnimationSources = {
						baseBody: `./img/animation/companions/${this.character.tag}/${this.mode}/baseBody.png`
					};
					animationSpriteLoader.loadImages(companionAnimationSources);
					/** @todo Different modes may have different width and height in physics. */
					// this.physics = new PhysicsCollider(0, 0, 32, 32);
				}
				
				this.spriteSheets = animationSpriteLoader.getSpriteSheets();
				animationSpriteLoader = null;
			}
		}
	}
	
	set_state(state) {
		if (CompanionAnimation.validStates.includes(state)) {
			(state === 'idle') ? this.animationSpeed = 500 : this.animationSpeed = 180;
			switch (state) {
				case 'walk':
					if (this.state !== 'walk') this.state = "walk";
					break;
				case 'run':
					if (this.state !== 'run') this.state = "run";
					break;
				case 'backup':
					if (this.state !== 'backup') this.state = "backup";
					break;
				case 'jump':
					if (this.state !== 'jump') this.state = "jump";
					break;
				default:
					if (this.state !== "idle") this.state = 'idle';
					if (this.animationSpeed !== 500) this.animationSpeed = 500;
					break;
					
			}
		}
	}
	
	set_action(action) {
		if (CompanionAnimation.validActions.includes(action)) {
			switch(action) {
				case 'hold': 
					if (this.action !== 'hold') this.action = 'hold';
					break;
				case 'lift':
					if (this.action !== 'lift') this.action = 'lift';
					break;
				case 'drop':
					if (this.action !== 'drop') this.action = 'drop';
				default:
					if (this.action !== "rest") this.action = 'rest';
					break;
			}
		}
	}
	
	render() {
		const ctx = getCTX('characters');
		//Player should have separation of baseBody, hairStyle, hairColor, 
		//eyeShape, eyeColor, outfits, weapons, & accessories
		
		//Companions should have separation of baseBody, hairStyle, outfits, 
		//weapons, & accessories
		
		const intendedSpritePos = 
			this.frameSheet[this.mode][this.direction][this.state]['baseBody'][this.currentFrame];
		
		drawFrame(ctx, this.spriteSheets, intendedSpritePos, camera.mapToScreen(this.physics));
	}
};

