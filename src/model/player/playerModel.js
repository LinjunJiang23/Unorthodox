// scripts/animation/companions/companionAnimation.js

/**
 * Centralizes all variable related to companions' animation
 * @static validStates - idle, walk, run, backup, jump
 * @static validActions - rest, hold, battle, lift, drop, drag
 */
class PlayerModel extends BaseModel {
	
	constructor(character) {
		super(character);
		this.init();
	}
	
	init() {
		if (this.character.tag === "player") {
			this.spriteSheets = 
			  this.character.logic.engine.assetLoader.get_assets('animation', 'characters', 
			  'player', 'normal', 'baseBody');
			this.physics = new PhysicsCollider(0, 0, 32, 32);
			this.animation = new AnimationManager(this);
			this.animation.allAnimations = playerAnimations;
			this.animation.currentAnimation = this.animation.allAnimations.normal.idle.down;
		}
	}
	
	update(timestamp) {
		super.update(timestamp);
	}
	
	
};