// scripts/mechanisms/physics/environment/envManager.js

/** 
 * This manages player's current surrounding
 */ 
class EnvManager {
  constructor(logic, camera) {
	this.eventManager = logic.eventManager;
	this.camera = camera;
	this.currentRegion = 'testLayer';
	this.eventManager.trigger('getAssets', {assetArray: ['maps', this.currentRegion], cb: (asset) => {
	  this.env = asset;
	}});
	Object.defineProperties(this, {
	  x: { get: () => this.camera.x },
	  y: { get: () => this.camera.y }
	});
	this.bg = {
	  canvasX: 0,
	  canvasY: 0
	};
	Object.defineProperties(this.bg, {
	  spriteSheet: {
		get: () => this.env
	  },
	  imageX: {
		get: () => this.x  
	  },
	  imageY: {
	    get: () => this.y
	  },
	  captureWidth: {
		get: () => this.camera.maxX
	  },
	  captureHeight: {
		get: () => this.camera.maxY
	  }
	});
	this.eventManager.trigger('renderBackground', { data: this.bg });
  }
	
};