// src/engine/tilemap/tilemap.js

/**
 * Stores tile map information 
 * @class
 * @property {string} name - name of the map
 * @property {Object} data - map data
 */
class TileMap {
	
	constructor(name, data, sectionWidth = 4, sectionHeight = 4) {
		if (typeof name === "string" && typeof data === "object") {
			this.name = name;
			this.tiles = {};
			this.tilelayers = data.layers;
			this.width = data.width;
			this.height = data.height;
			(typeof sectionWidth === "number" && sectionWidth >= 0) ? 
				this.sectionWidth = sectionWidth : 
				this.sectionWidth = 4;
			(typeof sectionHeight === "number" && sectionHeight >= 0) ? 
				this.sectionHeight = sectionHeight : 
				this.sectionWidth = 4;
			this.sections = new Map();
			this.staticCollision = new Set();
			this.tilelayers.forEach(_layer => {
		    if (_layer.type === "tilelayer") {
			  
			  //Add collision
			  if (_layer.name === "Obstacles") {
				_layer.data.forEach((tile, i) => {
					if (tile !== 0) {
						const x = i % this.width;
						const y = Math.floor(i / this.height);
						this.staticCollision.add(`${x},${y}`);
					}
				});
			  }			 
		    }
		  });
		  this.divideIntoSections();
		}
	}
	
	isStaticCollision(x, y) {
		return this.staticCollision.has(`${x},${y}`);
	}
	
	addStaticCollision(x, y) {
		if (typeof x === "number" && typeof y === "number") {
			this.staticCollision.add(`${x},${y}`);
		}
	}
	
	divideIntoSections() {
		for (let y = 0; y < this.height; y++) {
			for (let x = 0; x < this.width; x++) {				
				if (this.staticCollision.has(`${x},${y}`)) {
					const sectionX = Math.floor(x / this.sectionWidth);
					const sectionY = Math.floor(y / this.sectionHeight);
					const sectionKey = `${sectionX},${sectionY}`;
					
					if (!this.sections.has(sectionKey)) {
						this.sections.set(sectionKey, { staticCollision: [] });
					}
					
					const section = this.sections.get(sectionKey);
					section.staticCollision.push(`${x},${y}`);
				}
			}
		}
	}
	
	getSection(sectionX, sectionY) {
		return this.sections.get(`${sectionX},${sectionY}`) || null;
	}
	
	getName() {
		return this.name;
	}
	
	getSections() {
		return this.sections;
	}
		
	getStaticCollision() {
		return this.staticCollision;
	}
};