// scrips/ui/sprite/changeSprite.js

let currentPlayerPortraitSprite = {
	baseBody: {x: 0, y: 0},
	eyeShape: {x: 0, y: 0},
	hairStyle: {x: 0, y: 0}
};

function changePlayerPortraitSpritePosition(type, newX, newY) {
    if (currentPlayerPortraitSprite[type]) {
        currentPlayerPortraitSprite[type].x = newX;
        currentPlayerPortraitSprite[type].y = newY;
    } else {
        throw new Error(`Invalid sprite type for portrait: ${type}`);
    }
};

function changePlayerAnimationSpritePosition(type, val) {
	
};
	
async function changeCharacterSprite(val, target, type) {
	val = parseInt(val) - 1;
	if (typeof target === 'string' && typeof type === "string") {
		const ctx = await getCTX(target);
		if (!ctx) {
            console.error(`Could not get context for target: ${target}`);
            return;
        }
		let y = Math.trunc(val / 4) * 512;
		let x = (val % 4) * 512;
		let sheets = customSpriteLoader.getSpriteSheets();
		changePlayerPortraitSpritePosition(type, x, y);
		if (type === "baseBody") {
			characterAnimationSources.baseBody = `./img/animation/baseBody${val+1}.png`;
			animationSpriteLoader.loadImages(characterAnimationSources);
		} else {
			changePlayerAnimationSpritePosition(type, val + 1);
		}
		await drawCharacter(ctx, sheets, currentPlayerPortraitSprite, 512, 512);
	}
};