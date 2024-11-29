let characterPortraitSources = {
	baseBody: './img/customs/baseBody.png',
	eyeShape: './img/customs/eyeShape.png',
	hairStyle: './img/customs/hairStyle.png'
};

let mapSources = {
	testLayer: './img/maps/testMap.png'
};

/**
 * SpriteLoader class 
 */
class SpriteLoader {
    constructor() {
        this.spriteSheets = {};
    }

    loadImages(imageSources) {
		this.spriteSheets = {}; //clear all sprite sheets before loading new ones
        const promises = Object.entries(imageSources).map(([key, src]) => {
            return new Promise((resolve, reject) => {
                const img = new Image();
                img.src = src;
                img.onload = () => {
                    this.spriteSheets[key] = img;
                    resolve();
                };
                img.onerror = () => {
                    reject(new Error(`Failed to load image: ${src}`));
                };
            });
        });

        return Promise.all(promises);
    }

    getSpriteSheets() {
        return this.spriteSheets;
    }
};

let customSpriteLoader = new SpriteLoader();

// Load the custom images
customSpriteLoader.loadImages(characterPortraitSources)
    .then(() => {
		console.log('load customs sucessfully:', characterPortraitSources);
    })
    .catch(error => {
        console.error(error);
});

let mapLoader = new SpriteLoader();

// Load maps
mapLoader.loadImages(mapSources)
	.then(() => {
		console.log('load maps sucessfully:', mapSources);
    })
    .catch(error => {
        console.error(error);
});

