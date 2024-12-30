// src/engine/asset/assetLoader.js

class AssetLoader {
	constructor() {
		this.loadedAssets = {
			startScreen: null, 
			animation: {
				characters: {
						player: {
							normal: {
								hairStyle: null,
								eyeShape: null,
								baseBody: null,
								outfit: null,
								accessories: null,
								weapon: null
							},
							combat: null,
							stealth: null
						},
						companions: null,
						NPCs: null
				},
			},
			maps: {
				testLayer: null
			},
			items: null,
			envs: null
		};
		this.load_images('./img/maps/testMap.png', 'maps', 'testLayer');
		this.load_images('./img/animation/characters/player/chibi/normal/baseBody/baseBody1.png', 
			'animation', 'characters', 'player', 'normal', 'baseBody');
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
				console.log(current);
			} else {
				console.log(`Key "${key}" not found in loadedAssets.`);
				return; // Exit if a key is invalid
			}
		}
		console.log('Found the asset: ', current);
		
		return current;
	}

}
