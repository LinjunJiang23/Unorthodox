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
	this.width = 128;
	this.height = 128;
	this.sceneNode = new SceneNode(this.character.id, {
	  canvasX: this.x - (this.width/2), 
	  canvasY: this.y - (this.height/2),
	  rotation: 0,
	  spriteSheet: this.model.spriteSheets,
	  layer: 'team',
	  tags: ['character'],
	  canvasWidth: this.width,
	  canvasHeight: this.height
	});
	this.blender = new AnimationBlender();
  }
	
  update(timestamp) {
	if ((timestamp - this.character.lastUpdateTime) > this.animationSpeed[this.character.mode][this.character.state]) {
	  if (this.character.state === "idle" && this.character.idleTime > 300000) 
		console.log('Idle action animations should trigger after npc being idle for 5 min');
	  const currentFrame = (this.character.currentFrame + 1) % this.currentAnimation.frameNum;
	  if (currentFrame !== this.character.currentFrame) {
	    this.character.currentFrame = currentFrame;
		this.update_scene_node();
		this.character.lastUpdateTime = timestamp;
	  }
	}
  }	

  change_current_animation(mode, state, direction) {
	this.currentAnimation = this.allAnimations[mode][state][direction];
	this.update_scene_node();
  }
	
  change_position(x, y) {
	if ((x !== this.x) || (y !== this.y)) {
	  if (Math.abs(x - this.x) <= 15 && Math.abs(y - this.y) <= 15) {
		const newPos = this.blender.get_blend_position({ x: this.x, y: this.y }, { x: x, y: y });
		this.x = newPos.x;
		this.y = newPos.y;
		this.model.character.eventManager.trigger('characterMove', {});
	  }
	  //Auto walking that will be long distance should be implemented later
	}
  }
	
  get_current_frame() {
	return this.currentAnimation.frameSheet['baseBody'][this.character.currentFrame];
  }
  
  update_scene_node() {
	this.sceneNode.data['imageX'] = this.get_current_frame().x;
	this.sceneNode.data['imageY'] = this.get_current_frame().y;
	this.sceneNode.data['captureWidth'] = this.width;
	this.sceneNode.data['captureHeight'] = this.height;
	this.sceneNode.data['canvasX'] = this.x - (this.width/2);
	this.sceneNode.data['canvasY'] = this.y - (this.height/2);
  }
};