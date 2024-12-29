// src/engine/render/renderManager.js

class RenderManager {
    constructor(canvas, context) {
        this.canvas = [];
        this.context = [];
    }

    renderSprite(canvasName, sprite, x, y, width, height, posX, posY, sizeCanvasX, sizeCanvasY) {
		ctx.drawImage(spriteSheet, spriteX, spriteY, 
		spriteWidth, spriteHeight, 
		posX, posY, 
		sizeCanvasX, sizeCanvasY);
    }

    renderMap(map) {
        // Logic to draw map tiles
    }
	
	renderFrame(ctx, spriteSheet, intendedSpritePos, landedPosition, targetWidth = 128, targetHeight = 128) {
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
		ctx.fillText(`Player Position on map: (${player.model.physics.x.toFixed(2)}, ${player.model.physics.y.toFixed(2)})`, 10, 50);
	}
};