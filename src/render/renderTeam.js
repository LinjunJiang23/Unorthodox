// src/render/renderTeam.js


class RenderTeam {
	constructor(renderManager) {
		this.renderManager = renderManager;
		this.engine = renderManager.engine;
	}
	
	get_data() {
		const playerData = this.get_player();
		const companionsData = this.get_companions();
		
		const teamData = {
			player: playerData,
			companion: companionsData
		};
		
		return teamData;
		
	}
	
	get_player() {
		const playerModel = this.engine.logic.player.model;
		const currentCTX = this.renderManager.ctx['environment']['team'];
		
		const imagePos = playerModel.modelFrame;
		
		
		const spriteSheets = playerModel.spriteSheets;
		
		const screenPos = playerModel.get_screen_position();
				
		const curCanvasX = screenPos.x - (128/2);
		const curCanvasY = screenPos.y - (128/2);
		
		
		const playerData = {
				context: currentCTX, 
				spriteSheet: spriteSheets,
				imageX: imagePos.baseBody.x,
				imageY: imagePos.baseBody.y,
				captureWidth: 128,
				captureHeight: 128,
				canvasX: curCanvasX,
				canvasY: curCanvasY,
				canvasWidth: 128,
				canvasHeight: 128
		};


		
		return playerData;
	}
	
	get_companions() {
		const companionsData = {
		};
		return null;
	}

};