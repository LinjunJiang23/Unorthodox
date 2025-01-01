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
			this.frameSheet = playerFrames;
			this.modelFrame = {
				hairStyle: null,
				eyes: null,
				hand: null,
				accessories: null,
				weapon: null,
				outfit: null,
				baseBody: this.frameSheet['normal']['down']
					['idle']['baseBody'][0]
			};
		}
	}
	
	update(timestamp) {
		super.update(timestamp);
		this.modelFrame.baseBody = 
			this.frameSheet[this.character.mode][this.character.direction][this.character.state]['baseBody'][this.character.currentFrame];
	}
	
	get_frames() {		
		return this.modelFrame;
	}
	
	get_map_position() {
		return {
			x: this.physics.x,
			y: this.physics.y
		};
	}
	
	get_screen_position() {
		const screenPos = this.character.logic.engine.camera.map_to_screen(this.physics);
		return screenPos;
	}
};