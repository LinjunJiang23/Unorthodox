// src/animation/animationBlender.js

class AnimationBlender {
	constructor() {
		this.blendFactor = 0.5;
		this.blendSpeed = 0.05;

	}
	
	lerp(a, b, t) {
		return a + (b - a) * t;
	}
	
	get_blend_position(oriPos, newPos) {
		const blendedPos = {
			x: 0,
			y: 0
		};
		blendedPos.x = this.lerp(oriPos.x, newPos.x, this.blendFactor);
		blendedPos.y = this.lerp(oriPos.y, newPos.y, this.blendFactor);
		console.log("blended pos: ", blendedPos);
		return blendedPos;
	}
};