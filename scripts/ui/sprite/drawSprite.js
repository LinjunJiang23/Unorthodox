// scripts/ui/sprite/drawSprite.js

function drawSprite(ctx, spriteSheet, spriteX, spriteY, spriteWidth, spriteHeight, posX, posY, sizeCanvasX, sizeCanvasY) {
	ctx.drawImage(spriteSheet, spriteX, spriteY, 
	spriteWidth, spriteHeight, 
	posX, posY, 
	sizeCanvasX, sizeCanvasY);
};

function drawCharacter(ctx, spriteSheet, intendedSpritePos) {
    // Clear the entire canvas
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
	drawSprite(ctx, spriteSheet.baseBody, intendedSpritePos.baseBody.x, intendedSpritePos.baseBody.y, 512, 512, 0, 0);
	drawSprite(ctx, spriteSheet.eyeShape, intendedSpritePos.eyeShape.x, intendedSpritePos.eyeShape.y, 512, 512, 0, 0);
	drawSprite(ctx, spriteSheet.hairStyle, intendedSpritePos.hairStyle.x, intendedSpritePos.hairStyle.y, 512, 512, 0, 0);
};