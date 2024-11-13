// scripts/ui/sprite/drawSprite.js

/**
 * drawSprite
 * @param ctx
 * @param spriteSheet
 * @param spriteX
 
 */
function drawSprite(ctx, spriteSheet, spriteX, spriteY, spriteWidth, spriteHeight, posX, posY, sizeCanvasX, sizeCanvasY) {
	ctx.drawImage(spriteSheet, spriteX, spriteY, 
	spriteWidth, spriteHeight, 
	posX, posY, 
	sizeCanvasX, sizeCanvasY);
};

/**
 * drawCharacter
 * @param ctx
 * @param spriteSheet
 * @param spriteSheet
 */
function drawCharacter(ctx, spriteSheet, intendedSpritePos, targetWidth, targetHeight) {
    // Clear the entire canvas
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
	drawSprite(ctx, spriteSheet.baseBody, intendedSpritePos.baseBody.x, intendedSpritePos.baseBody.y, targetWidth, targetHeight, 0, 0, targetWidth, targetHeight);
	drawSprite(ctx, spriteSheet.eyeShape, intendedSpritePos.eyeShape.x, intendedSpritePos.eyeShape.y, targetWidth, targetHeight, 0, 0, targetWidth, targetHeight);
	drawSprite(ctx, spriteSheet.hairStyle, intendedSpritePos.hairStyle.x, intendedSpritePos.hairStyle.y, targetWidth, targetHeight, 0, 0, targetWidth, targetHeight);
};

/**
 * drawFrame
 * @param ctx
 * @param spriteSheet
 * @param spriteSheet
 */
function drawFrame(ctx, spriteSheet, intendedSpritePos, landedPosition, targetWidth = 128, targetHeight = 128) {
	ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
	drawSprite(ctx, spriteSheet.baseBody, intendedSpritePos.x, intendedSpritePos.y, 128, 128, landedPosition.x, landedPosition.y, targetWidth, targetHeight);
};