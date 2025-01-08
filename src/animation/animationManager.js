// src/animation/animationManager.js

class AnimationManager {
	constructor(model) {
		this.model = model;
		this.character = model.character;
		this.allAnimations = {};
		this.currentAnimation;
		this.animationSpeed = {
			normal: {
				walk: 180,
				run: 280,
				idle: 500
			}
		};
		this.x = this.model.physics.x;
		this.y = this.model.physics.y;
		this.blender = new AnimationBlender();
	}
	
	change_current_animation(mode, state, direction) {
		this.currentAnimation = this.allAnimations[mode][state][direction];
	}
	
	update(timestamp) {
		if ((timestamp - this.character.lastUpdateTime) > this.animationSpeed[this.character.mode][this.character.state]) {
			if (this.character.state === "idle" && this.character.idleTime > 300000) 
				console.log('Idle action animations should trigger after npc being idle for 5 min');
			this.character.currentFrame = (this.character.currentFrame + 1) % this.currentAnimation.frameNum;
			this.character.lastUpdateTime = timestamp;
		}
	}
	
	change_position(x, y) {
		if ((x !== this.x) || (y !== this.y)) {
			if (Math.abs(x - this.x) <= 15 && Math.abs(y - this.y) <= 15) {
				const newPos = this.blender.get_blend_position({ x: this.x, y: this.y }, { x: x, y: y });
				this.x = newPos.x;
				this.y = newPos.y;
			}
			//Auto walking that will be long distance should be implemented later
		}
	}
	
	
	
	get_current_frame() {
		return this.currentAnimation.frameSheet['baseBody'][this.character.currentFrame];
	}
	
};