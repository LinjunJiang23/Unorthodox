const characterImageSources = {
	baseBody: './img/baseBody.png',
	eyeShape: './img/eyeShape.png'
};

let currentPlayerSprite = {
	baseBody: {x: 0, y: 0},
	eyeShape: {x: 0, y: 0}
};

/* Sprite Singleton */
class CharacterSpriteLoader {
    constructor() {
        if (CharacterSpriteLoader.instance) {
            return CharacterSpriteLoader.instance;
        }
        this.characterSpriteSheets = {};
        CharacterSpriteLoader.instance = this;
    }

    loadImages(imageSources) {
        const promises = Object.entries(imageSources).map(([key, src]) => {
            return new Promise((resolve, reject) => {
                const img = new Image();
                img.src = src;
                img.onload = () => {
                    this.characterSpriteSheets[key] = img;
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
        return this.characterSpriteSheets;
    }
};

const spriteLoader = new CharacterSpriteLoader();

// Load the images
spriteLoader.loadImages(characterImageSources)
    .then(() => {
		console.log('load sucessfully:', characterImageSources);
    })
    .catch(error => {
        console.error(error);
});

const drawSprite = (ctx, spriteSheet, spriteX, spriteY, spriteWidth, spriteHeight, posX, posY) => {
	ctx.drawImage(spriteSheet, spriteX, spriteY, spriteWidth, spriteHeight, posX, posY, spriteWidth, spriteHeight);
};

const drawCharacter = (ctx, spriteSheet, intendedSpritePos) => {
    // Clear the entire canvas
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
	drawSprite(ctx, spriteSheet.baseBody, intendedSpritePos.baseBody.x, intendedSpritePos.baseBody.y, 256, 256, 0, 0);
	drawSprite(ctx, spriteSheet.eyeShape, intendedSpritePos.eyeShape.x, intendedSpritePos.eyeShape.y, 256, 256, 0, 0);
};

const changePlayerSpritePosition = (type, newX, newY) => {
    if (currentPlayerSprite[type]) {
        currentPlayerSprite[type].x = newX;
        currentPlayerSprite[type].y = newY;
    } else {
        throw new Error(`Invalid sprite type: ${type}`);
    }
};
	
const changeCharacterSprite = async (val, target, type) => {
	val = parseInt(val) - 1;
	if (typeof target === 'string' && typeof type === "string") {
		const ctx = await getCTX(target);
		if (!ctx) {
            console.error(`Could not get context for target: ${target}`);
            return;
        }
		let y = Math.trunc(val / 4) * 258;
		let x = (val % 4) * 258;
		let sheets = spriteLoader.getSpriteSheets();
		changePlayerSpritePosition(type, x, y);
		await drawCharacter(ctx, sheets, currentPlayerSprite);
	}
};

const isGray = (r, g, b) => {
	const threshold = 30;
	return Math.abs(r - g) < threshold && Math.abs(g - b) < threshold && Math.abs(b - r) < threshold;
};


/* This currently doesn't work, will finish it later. */
const changeCharacterSpriteColor = (val, target, type) => {
    // Select the canvas element (make sure it is actually a canvas)
    val = parseInt(val);
	if (typeof target === 'string' && typeof type === "string" && val) {
		const ctx = getCTX(target);
		if (!ctx) {
            console.error(`Could not get context for target: ${target}`);
            return;
        }
		const imageData = ctx.getImageData(0, 0, 256, 256);
		const data = imageData.data;
		let color;
        switch (val) {
			case 1:
				color = {r: 95, g: 97, b: 112}; //Default gray
            case 2:
                color = {r: 140, g: 164, b: 214}; //blue
                break;
            case 3:
                color = {r: 155, g: 201, b: 157}; //green 
                break;
            case 4:
				color = {r: 235, g: 186, b: 127}; //orange
				break;
			case 5:
				color = {r: 235, g: 127, b: 127}; //pink
				break;
			case 6:
				color = {r: 164, g: 23, b: 23}; //red
				break;
			case 7:
				color = {r: 235, g: 227, b: 150}; //yellow
				break;	
			case 8:
				color = {r: 150, g: 235, b: 227}; //teal
				break;
			case 9:
				color = {r: 87, g: 88, b: 90}; //black
				break;
			case 10:
				color = {r: 236, g: 240, b: 241}; //white
				break;
			case 11:
				color = {r: 223, g: 191, b: 127}; //another yellow
				break;
			case 12:
				color = {r: 181, g: 117, b: 88}; //another red
				break;
			case 13:
                color = {r: 105, g: 152, b: 114}; //another green 
                break;
			case 14:
                color = {r: 166, g: 141, b: 121}; //brown 
                break;
			case 15:
                color = {r: 102, g: 66, b: 55}; //another brown 
                break;
			case 16:
                color = {r: 22, g: 101, b: 154}; //another blue
                break;
		}
		for (let i = 0; i < data.length; i += 4) {
          const r = data[i];     // Red
          const g = data[i + 1]; // Green
          const b = data[i + 2]; // Blue

          // Check if the pixel is gray (you can adjust the threshold as needed)
          if (isGray(r, g, b)) {
            // Change the color of the gray pixel
            data[i] = color.r;     // Change red
            data[i + 1] = color.g; // Change green
            data[i + 2] = color.b; // Change blue
            // Keep alpha the same (data[i + 3])
          }
		 }
		 ctx.putImageData(imageData, 0, 0);
    };
};