// scripts/mechanisms/animation/npcAnimation.js

/**
 * Centralizes all aspects related to npc's animation, including current location, current state, 
 * current action state, is moving, is idle, current frame for animation, direction of animation, 
 * last update time for frame, and sprite sheets for the npc(s).
 * @class
 * @summary   Animation for NPCs.
 * @static validStates - idle, walk, run, backup, jump
 * @static validActions - rest, held, battle, lifted, dragged, dropped
 */
class npcAnimation extends BaseAnimation {
	static validStates = ['idle', 'walk', 'run', 'backup', 'jump'];
	static validActions = ['rest', 'held', 'battle', 'lifted', 'dragged', 'dropped'];
	
	constructor(character) {
		super(character);
		this.init();
	}
	
	init() {
		/** @todo Need to change this to npc sprite sheets*/
		const npcAnimationSources = { 
			baseBody: `./img/animation/NPC/${this.character.tag}/baseBody1.png`
		};
		const npcAnimationSpriteLoader = new SpriteLoader();
		npcAnimationSpriteLoader.loadImages(npcAnimationSources);
		
		this.spriteSheets = npcAnimationSpriteLoader.getSpriteSheets();
		this.physics = new PhysicsCollider(0, 0, 32, 32);
		this.frameSheet = npcFrames;
	}
	
	changeState(state) {
		if (npcAnimation.validStates.includes(state)) {
			if (this.state !== state) this.state = state;
		} else {
			console.log('State :', state, " not found!");
		}
	}
	
	changeAction(action) {
		if (npcAnimation.validActions.includes(action)) {
			if (this.action !== action) this.action = action;
		} else {
			console.log("Action: ", action, " not found!");
		}
	}
	
	render() {
		super.render();
		const ctx = getCTX('interactable');
		let npcPosition = {x: this.physics.x, y: this.physics.y};
		/** @todo Haven't finished drawing npc sprite sheets, should replace with npc sprites later on */
		const intendedSpritePos = 
		  this.frameSheet[this.direction][this.state]['baseBody'][this.currentFrame];
		drawFrame(ctx, this.spriteSheets, intendedSpritePos, camera.mapToScreen(npcPosition));
	}
	
};