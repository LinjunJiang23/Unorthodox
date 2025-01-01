// src/render/renderHelpers.js

function renderSprite(ctx, spriteSheet, spriteX, spriteY, 
  spriteWidth, spriteHeight, posX, posY, canvasX, canvasY) {
		
	if (!ctx) {
		console.error("Invalid context passed to render_sprite");
		return;
	}
		
	console.log("Destination position and size:", { posX, posY, canvasX, canvasY });
	console.log("Canvas size:", ctx.canvas.width, ctx.canvas.height);
		
		
	ctx.drawImage(spriteSheet, spriteX, spriteY, 
	  spriteWidth, spriteHeight, posX, posY, 
	  canvasX, canvasY);
};