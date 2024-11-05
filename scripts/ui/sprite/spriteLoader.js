let characterCustomSources = {
	baseBody: './img/customs/baseBody.png',
	eyeShape: './img/customs/eyeShape.png',
	hairStyle: './img/customs/hairStyle.png'
};

let currentPlayerSprite = {
	baseBody: {x: 0, y: 0},
	eyeShape: {x: 0, y: 0},
	hairStyle: {x: 0, y: 0}
};

let mapSources = {
	testLayer: './img/maps/testMap.png'
};

/* Sprite Singleton */
class SpriteLoader {
    constructor() {
        this.spriteSheets = {};
    }

    loadImages(imageSources) {
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
customSpriteLoader.loadImages(characterCustomSources)
    .then(() => {
		console.log('load customs sucessfully:', characterCustomSources);
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