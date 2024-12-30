// scripts/mechanisms/gamePlay/camera/camera.js

/**
 * Singleton class serves as viewport
 * Camera centers around leader
 * MAY IMPLEMENT PROPS THAT ALLOW PLAYER TO MOVE CAMERA IN THE FUTURE
 * @property x
 * @property y
 * @property minX
 * @property minY
 * @property maxX
 * @property maxY
 * @property zoomFactor - default 7.5 zoomFactor
 */
class Camera {
	
	/**
	 * Camera's initial set up is always the top left corner of viewport
	 */
	constructor() {
		this.x = 0;
		this.y = 0;
		this.width = 256;
		this.height = 144;
		this.zoomFactor = 7.5;
	}
	
	// Converts map coordinates to screen coordinates
	map_to_screen(mapPos) {
		return { 
			x: ((mapPos.x - this.x) * this.zoomFactor), 
			y: ((mapPos.y - this.y) * this.zoomFactor) 
		};
	}

	// Converts screen coordinates to map coordinates
	screen_to_map(screenPos) {
		return { 
		  x: (screenPos.x + this.x) / this.zoomFactor, 
		  y: (screenPos.y + this.y) / this.zoomFactor 
		};
	}

	//Centers the camera on a specific point
	center_camera_on(pos) {
		this.x = pos.x - this.width / 2 ;
		this.y = pos.y - this.height / 2;
		this.setCameraBounds();
	}

	//
	set_camera_bounds() {
		this.x = Math.max(this.minX, Math.min(this.x, this.width));
		this.y = Math.max(this.minY, Math.min(this.y, this.height));
	}

	//
	move_camera_to(pos, speed = 1) {
		let newX = this.x + pos.x * speed;
		let newY = this.y + pos.y * speed;
		newX <= -(this.width / 2) ? this.x = -(this.width / 2) : this.x = newX;
		newY <= -(this.height / 2) ? this.y = -(this.height / 2) : this.y = newY;
	}
	
	//
	reset_camera() {
		this.centerCameraOn(getLeader().physics);
	}
	
	//
	get_position() {
		return {x: this.x, y: this.y};
	}
};

let camera = new Camera();