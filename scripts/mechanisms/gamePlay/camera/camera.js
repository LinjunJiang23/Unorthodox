// scripts/mechanisms/gamePlay/camera/camera.js

/**
 * Camera - singleton class serves as viewport
 * Allows camera that centers around player
 * MAY IMPLEMENT PROPS THAT ALLOW PLAYER TO MOVE CAMERA IN THE FUTURE
 */
class Camera {
	
	/**
	 * 
	 * Camera's initial set up is always the top left corner of 256x256 tiles
	 */
	constructor() {
		if (Camera.instance) {
			return Camera.instance;
		}
		Camera.instance = this;
		this.x = 128;
		this.y = 128;
	}
	
	// Converts map coordinates to screen coordinates
	mapToScreen(x, y) {
		return { x: x - this.x, y: y - this.y };
	}

	// Converts screen coordinates to map coordinates
	screenToMap(x, y) {
		return { x: x + this.x, y: y + this.y };
	}

	//Centers the camera on a specific point
	centerCameraOn(x, y) {
		this.x = x - 128;
		this.y = y - 128;
	}

	setCameraBounds(minX, maxX, minY, maxY) {
		this.x = Math.max(minX, Math.min(this.x, maxX));
		this.y = Math.max(minY, Math.min(this.y, maxY));
	}

	moveCameraTo(targetX, targetY, speed = 1) {
		let newX = this.x + targetX * speed;
		let newY = this.y + targetY * speed;
		newX <= 128 ? this.x = 128 : this.x = newX;
		newY <= 128 ? this.y = 128 : this.y = newY;
	}
	
	resetCamera() {
		this.x = 128;
		this.y = 128;
	}
	
	getPosition() {
		return {x: this.x, y: this.y};
	}
};

let camera = new Camera();