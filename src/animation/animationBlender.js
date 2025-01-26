// src/animation/animationBlender.js

class AnimationBlender {
  constructor() {
	this.blendFactor = 0.5;
	this.blendSpeed = 0.05;

  }
	
  get_blend_position(oriPos, newPos) {
	const blendedPos = {
	  x: 0,
	  y: 0
	};
	blendedPos.x = lerp(oriPos.x, newPos.x, this.blendFactor);
	blendedPos.y = lerp(oriPos.y, newPos.y, this.blendFactor);
	return blendedPos;
  }
};