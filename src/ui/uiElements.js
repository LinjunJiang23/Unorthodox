// src/ui/uiElements.js

const uiElements = {
	startscreen: {
				title: document.getElementById('startscreen-title'),
				animation: document.getElementById('startscreen-animation'),
				startGame: document.getElementById('startscreen-startgame'),
				loadGame: document.getElementById('startscreen-loadgame'),
				extras: document.getElementById('startscreen-extras'),
				setting: document.getElementById('startscreen-setting'),
				credit: document.getElementById('startscreen-credit'),
				quitGame: document.getElementById('startscreen-quitgame')
				
	},
	gameUI: {
		hud:{},
		inventory: {
			button: null,
			
		},
		miniMap: {}
	},
	settingsUI: {
	},
	
	lazyLoadGameUI() {
		this.gameUI.inventory.button = document.getElementById('inventory-button');
	},
	
	lazyLoadSettingsUI() {
		
	}
};