function getCTX(target) {
	if (typeof target === 'string') {
		const canvas = document.getElementById(`canvas-${target}`);
		const ctx = canvas.getContext('2d');
		return ctx;
	}
	return null;
};

async function createPlayerCanvas() {
	try {
		const initializeCanvas = () => {
		$('#customSidebar').prepend('<div class="icon-fullbody">');
		$('.icon-fullbody').append("<canvas id='canvas-player-fullbody' width='256' height='256'></canvas>");
		$('#customSidebar').append('</div>')};
		console.log("triggered");
		initializeCanvas();
		const ctx = await new Promise((resolve) => setTimeout(() => resolve(getCTX('player-fullbody')), 0));
		ctx.clearRect(0, 0, 256, 256);
		let sheets = spriteLoader.getSpriteSheets();
		drawSprite(ctx, sheets.baseBody, 0, 0, 256, 256, 0, 0);
		drawSprite(ctx, sheets.eyeShape, 0, 0, 256, 256, 0, 0);
	} catch (err) {
		throw new Error(err);
	}
};




