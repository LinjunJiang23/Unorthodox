// scripts/mechanisms/gamePlay/camera/camera.js

/**
 * @class
 * @property x
 * @property y
 * @property minX
 * @property minY
 * @property maxX
 * @property maxY
 * @property zoomFactor - default 5 zoomFactor
 */
class Camera {
	
	/**
	 * Camera's initial set up is always the top left corner of viewport
	 */
	constructor() {
		this.x = 0;
		this.y = 0;
		this.minX = 0;
		this.minY = 0;
		this.maxX = 256;
		this.maxY = 144;
		this.zoomFactor = 5;
	}
	
	map_to_screen(mapPos) {
		const pos = { 
			x: ((mapPos.x - this.x) * this.zoomFactor), 
			y: ((mapPos.y - this.y) * this.zoomFactor) 
		};
		return pos;
	}

	screen_to_map(screenPos) {
		return { 
		  x: (screenPos.x + this.x) / this.zoomFactor, 
		  y: (screenPos.y + this.y) / this.zoomFactor 
		};
	}

	center_camera_on(pos) {
		this.x = pos.x - this.maxX / 2;
		this.y = pos.y - this.maxY / 2;
		this.set_camera_bounds();
	}

	set_camera_bounds() {
		this.x = Math.max(this.minX, Math.min(this.x, this.maxX));
		this.y = Math.max(this.minY, Math.min(this.y, this.maxY));
	}
	
	move_camera_to(pos, speed = 1) {
		this.x += (pos.x - this.x) * speed;
		this.y += (pos.y - this.y) * speed;
		this.set_camera_bounds();
	}
	
	reset_camera() {
		this.centerCameraOn(getLeader().physics);
	}
	
	follow_character(character) {
		console.log("Following character: ", character);
		const offsetX = 10;
		const offsetY = 5;
		const newX = character.model.physics.x - offsetX;
		const newY = character.model.physics.y - offsetY;
		console.log("New x: ", newX, "y: ", newY);
		this.center_camera_on({
			x: newX,
			y: newY
		});
	}
	
	shake(intensity, duration) {
		const originalPos = this.get_position();
		let timeLeft = duration;
		const shakeInterval = setInterval(() => {
			if (timeLeft <= 0) {
				clearInterval(shakeInterval);
				this.x = originalPos.x;
				this.y = originalPos.y;
			} else {
				this.x += (Math.random() - 0.5) * intensity;
				this.y += (Math.random() - 0.5) * intensity;
				timeLeft -= 100;
			}
		}, 100);
	}
	
	move_camera_smooth_damp(targetX, targetY, smoothingFactor) {
		this.x += (targetX - this.x) * smoothingFactor;
		this.y += (targetY - this.y) * smoothingFactor;
	}

	
	get_position() {
		return {x: this.x, y: this.y};
	}
};

