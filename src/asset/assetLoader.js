// src/engine/asset/assetLoader.js

class AssetLoader {
	constructor() {
		this.loadedAssets = assets;
		this.load_images('./img/maps/testMap.png', 'maps', 'testLayer');
		this.load_images('./img/animation/characters/player/chibi/normal/baseBody/baseBody1.png', 
			'animation', 'characters', 'player', 'normal', 'baseBody');
		this.load_images('./img/portraits/chenru/neutral.png', 'portraits', 'chenru', 'neutral');
	}
	
	load_images(url, ...keys) {
		return new Promise((resolve, reject) => {
			const img = new Image();
			img.onload = () => {
				
				let target = this.loadedAssets;
				for (let i = 0; i < keys.length - 1; i++) {
					if (!target[keys[i]]) {
                    target[keys[i]] = {}; // Create the key as an object if it doesn't exist
					}
					
					target = target[keys[i]]; // Traverse deeper into the nested structure
					console.log(target);
				}
				
				target[keys[keys.length - 1]] = img; // Assign the image to the last key
				
				resolve(img);
			}
			img.onerror = reject;
			img.src = url;
		});
	}
	
	get_assets(...keys) {
		let current = this.loadedAssets;
    
		// Traverse the keys step by step
		for (let key of keys) {
			if (current[key]) {
				current = current[key];
			} else {
				console.log(`Key "${key}" not found in loadedAssets.`);
				return; // Exit if a key is invalid
			}
		}		
		return current;
	}

};
