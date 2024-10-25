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
		let sheets = spriteLoader.getSpriteSheets();
		drawSprite(ctx, sheets.baseBody, 0, 0, 512, 512, 0, 0);
		drawSprite(ctx, sheets.eyeShape, 0, 0, 512, 512, 0, 0);
		drawSprite(ctx, sheets.hairStyle, 0, 0, 512, 512, 0, 0);
	} catch (err) {
		throw new Error(err);
	}
};

async function createEnvironmentCanvas() {
	try {
		const initializeCanvas = () => {
			$(document).ready(function() {
				$('.passage').append('<div id="environment"></div>');
				$('#environment').append('<canvas id="canvas-environment" height="800px" width="800px"></canvas>');
		})};
			initializeCanvas();
			const ctx = await new Promise((resolve) => setTimeout(() => resolve(getCTX('environment')), 0));
			ctx.clearRect(0, 0, 800, 800);
	} catch (err) {
		throw new Error(err);
	}
};



