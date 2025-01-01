// src/setting/settingManager.js

class SettingManager {
	constructor() {
		this.canvas = canvas;
		this.graphics = {
			resolution: {
				viewportWidth: 1080, 
				viewportHeight: 720
			}
		};
	}
	
	init() {
		myPromise.then(() => this.canvas.lazyloadEnvironmentCanvas())
		.then(() => {
			Object.values(this.canvas.environment).forEach(ele => {
				ele.width = this.graphics.resolution.viewportWidth;
				ele.height = this.graphics.resolution.viewportHeight;
			});
		});
	}
	
	set_size_gameEnv(width, height) {
		this.graphics.resolution.viewportWidth = width;
		this.graphics.resolution.viewportHeight = height;
	}
};

//16:9 (1920x1080, 1280x720)
//18:9 or 19.5:9 (e.g., 1080x2340): Common for newer phones with taller screens. 
//4:3 (e.g., 2048x1536): Used in tablets, like iPads.