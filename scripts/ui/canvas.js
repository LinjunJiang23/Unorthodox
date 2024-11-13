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
		$('.icon-fullbody').append("<canvas id='canvas-player-fullbody' width='512' height='512'></canvas>");
		$('#customSidebar').append('</div>')};
		console.log("triggered");
		initializeCanvas();
		const ctx = await new Promise((resolve) => setTimeout(() => resolve(getCTX('player-fullbody')), 0));
		ctx.clearRect(0, 0, 512, 512);
		let sheets = customSpriteLoader.getSpriteSheets();
		drawCharacter(ctx, sheets, currentPlayerPortraitSprite, 512, 512);
	} catch (err) {
		throw new Error(err);
	}
};



