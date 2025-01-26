// src/animation/animationManager.js

class AnimationManager {
  constructor(model) {
	this.model = model;
	this.character = model.character;
	this.allAnimations = {};
	this.animationSpeed = {
	  normal: {
		walk: 180,
		run: 280,
		idle: 500
	  }
	};
	this.x = this.model.physics.x;
	this.y = this.model.physics.y;
	this.width = 128;
	this.height = 128;
	this.blender = new AnimationBlender();
  }
  
  init() {
    Object.defineProperty(this, 'currentAnimationSpeed', {
	  get: () => this.animationSpeed[this.character.mode][this.character.state]
	});
	Object.defineProperty(this, 'currentAnimation', {
	  get: () => this.allAnimations[this.character.mode][this.character.state][this.character.direction]
	});
	Object.defineProperty(this, 'animationCurrentFrame', {
	  get: () => this.currentAnimation.frameSheet['baseBody'][this.character.currentFrame]
	});
	this.sceneNode = new SceneNode(() => this.character.id, {
	  imageX: () => this.animationCurrentFrame.x,
	  imageY: () => this.animationCurrentFrame.y,
	  captureWidth: () => this.width,
	  captureHeight: () => this.height,
	  canvasX: () => this.x - (this.width / 2),
	  canvasY: () => this.y - (this.height / 2),
	  spriteSheet: () => this.model.spriteSheets,
	  layer: 'team',
	  tags: ['character'],
	  canvasWidth: () => this.width,
	  canvasHeight: () => this.height
	});
  }
	
  
  update(timestamp) {
	if ((timestamp - this.character.lastUpdateTime) > this.currentAnimationSpeed) {
	  if (this.character.state === "idle" && this.character.idleTime > 300000) 
		console.log('Idle action animations should trigger after npc being idle for 5 min');
	  const currentFrame = (this.character.currentFrame + 1) % this.currentAnimation.frameNum;
	  if (currentFrame !== this.character.currentFrame) {
		this.character.currentFrame = currentFrame;
		this.character.lastUpdateTime = timestamp;
	  }
	}
  }
	
  change_position(newX, newY) {
	if (newX !== this.x || newY !== this.y) {
	  if (Math.abs(newX - this.x) <= 15 && Math.abs(newY - this.y) <= 15) {
		const newPos = this.blender.get_blend_position({ x: this.x, y: this.y }, { x: newX, y: newY });
		this.x = newPos.x;
		this.y = newPos.y;
	  }
	  //Auto walking that will be long distance should be implemented later
	}
  }
  
};