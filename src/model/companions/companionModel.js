// scripts/animation/companions/companionAnimation.js

/**
 * Centralizes all variable related to companions' animation
 * @static validStates - idle, walk, run, backup, jump
 * @static validActions - rest, hold, battle, lift, drop, drag
 */
class CompanionModel extends BaseModel {
	
	constructor(character) {
		super(character);
		this.init();
	}
	
	init() {
		this.load_spriteSheets('animation', 'characters', 
		'companions', 'normal', 'baseBody');
		/** @todo Different companions should have different width and height in physics. */
		this.physics = new PhysicsCollider(0, 0, 32, 32);
		/** @todo Different companions should have different frame sheets. */
		this.frameSheet = playerFrames;
	}
	
	
	
	render() {
		//Player should have separation of baseBody, hairStyle, hairColor, 
		//eyeShape, eyeColor, outfits, weapons, & accessories
		
		//Companions should have separation of baseBody, hairStyle, outfits, 
		//weapons, & accessories
		

	}
};

