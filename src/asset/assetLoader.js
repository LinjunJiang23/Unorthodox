// src/engine/asset/assetLoader.js

class AssetLoader {
	constructor() {
		this.assets = {};
	}
	
	load_images(key, url) {
		return new Promise((resolve, reject) => {
			const img = new Image();
			img.onload = () => {
				this.assets[key] = img;
				resolve(img);
			};
			img.onerror = reject;
			img.src = url;
		});
	}
	
	get_assets(key) {
		return this.assets[key];
	}

}
