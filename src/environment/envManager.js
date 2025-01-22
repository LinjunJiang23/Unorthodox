// scripts/mechanisms/physics/environment/envManager.js

/** 
 * This manages player's current surrounding
 */ 
class EnvManager {
  constructor(logic, camera) {
	this.eventManager = logic.eventManager;
	
	this.currentRegion = 'testLayer';
	this.eventManager.trigger('getAssets', {assetArray: ['maps', this.currentRegion], cb: (asset) => {
	  this.env = asset;
	}});
	this.x = 0;
	this.y = 0;
	this.bg = {
	  spriteSheet: this.env || null,
	  imageX: this.x,
	  imageY: this.y,
	  captureWidth: (camera.maxX - camera.minX),
	  captureHeight: (camera.maxY - camera.minY),
	  canvasX: 0,
	  canvasY: 0
	};
	this.eventManager.trigger('renderBackground', { data: this.bg });

  }

  update_position(cameraPosition) {
	if (this.x !== cameraPosition.x || this.y !== cameraPosition.y) {
	  this.x = cameraPosition.x;
	  this.y = cameraPosition.y;
	  this.eventManager.trigger('renderBackground', { data: this.bg });
	}
  }
	
};