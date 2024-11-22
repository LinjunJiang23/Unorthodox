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
		this.x = 0;
		this.y = 0;
		this.minX = 0;
		this.minY = 0;
		this.maxX = 1024;
		this.maxY = 1024;
		this.zoomFactor = 4;
	}
	
	// Converts map coordinates to screen coordinates
	mapToScreen(mapPos) {
		return { x: (mapPos.x * this.zoomFactor) - this.x, y: (mapPos.y * this.zoomFactor) - this.y };
	}

	// Converts screen coordinates to map coordinates
	screenToMap(screenPos) {
		return { x: (screenPos.x + this.x) / this.zoomFactor, y: (screenPos.y + this.y) / this.zoomFactor };
	}

	//Centers the camera on a specific point
	centerCameraOn(pos) {
		this.x = (pos.x * this.zoomFactor) - 512;
		this.y = (pos.y * this.zoomFactor) - 512;
		console.log(this.x, this.y);
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
		this.centerCameraOn(playerPosition);
	}
	
	//
	getPosition() {
		return {x: this.x, y: this.y};
	}
};

let camera = new Camera();