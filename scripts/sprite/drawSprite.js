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
	drawSprite(ctx, spriteSheet.baseBody, intendedSpritePos.x, intendedSpritePos.y, 128, 128, (landedPosition.x - (targetWidth / 2)), (landedPosition.y - (targetHeight / 2)), targetWidth, targetHeight);
	ctx.strokeStyle = "red";
    ctx.strokeRect(
        landedPosition.x - (targetWidth / 2),
        landedPosition.y - (targetHeight / 2),
        targetWidth,
        targetHeight
    );

    ctx.fillStyle = "white";
    ctx.font = "12px Arial";
    ctx.fillText(`Player Position on Screen: (${landedPosition.x.toFixed(2)}, ${landedPosition.y.toFixed(2)})`, 10, 20);
	ctx.fillText(`Player Position on map: (${playerPosition.x.toFixed(2)}, ${playerPosition.y.toFixed(2)})`, 10, 50);
};