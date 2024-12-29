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
 * @property zoomFactor - scaling a 64x64, 128x128, 256x256 viewport size to a 1024x1024 screen size
 */
class Camera {
	
	/**
	 * Camera's initial set up is always the top left corner of viewport
	 */
	constructor() {
		if (Camera.instance) {
			return Camera.instance;
		}
		Camera.instance = this;
		this.init();
	}
	
	init() {
		this.x = 0;
		this.y = 0;
		this.minX = 0;
		this.minY = 0;
		this.maxX = 256;
		this.maxY = 256;
		this.zoomFactor = 4;
	}
	
	// Converts map coordinates to screen coordinates
	mapToScreen(mapPos) {
		return { 
			x: ((mapPos.x - this.x) * this.zoomFactor), 
			y: ((mapPos.y - this.y) * this.zoomFactor) 
		};
	}

	// Converts screen coordinates to map coordinates
	screenToMap(screenPos) {
		return { 
		  x: (screenPos.x + this.x) / this.zoomFactor, 
		  y: (screenPos.y + this.y) / this.zoomFactor 
		};
	}

	//Centers the camera on a specific point
	centerCameraOn(pos) {
		this.x = pos.x - 128;
		this.y = pos.y - 128;
		this.setCameraBounds();
	}

	//
	setCameraBounds() {
		this.x = Math.max(this.minX, Math.min(this.x, this.maxX));
		this.y = Math.max(this.minY, Math.min(this.y, this.maxY));
	}

	//
	moveCameraTo(pos, speed = 1) {
		let newX = this.x + pos.x * speed;
		let newY = this.y + pos.y * speed;
		newX <= -128 ? this.x = -128 : this.x = newX;
		newY <= -128 ? this.y = -128 : this.y = newY;
	}
	
	//
	resetCamera() {
		this.centerCameraOn(player.model.physics);
	}
	
	//
	getPosition() {
		return {x: this.x, y: this.y};
	}
};

let camera = new Camera();