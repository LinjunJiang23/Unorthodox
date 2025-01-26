// scripts/animation/companions/companionAnimation.js

/**
 * Centralizes all variable related to companions' animation
 * @static validStates - idle, walk, run, backup, jump
 * @static validActions - rest, hold, battle, lift, drop, drag
 */
class PlayerModel extends BaseModel {
  constructor(character) {
	super(character);
	if (this.character.tag === "player") {
	  this.character.eventManager.trigger('getAssets', { assetArray: ['animation', 'characters', 
		'player', 'normal', 'baseBody'], cb: (currentAsset) => this.spriteSheets = currentAsset });
	  this.physics = new PhysicsCollider(0, 0, 32, 32);
	  this.animation = new AnimationManager(this);
	  this.animation.allAnimations = playerAnimations;
	  this.animation.init();
	}
  }
};