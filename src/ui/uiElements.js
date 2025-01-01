// src/ui/uiElements.js

const uiElements = {
	startscreen: {
		div: null,
		title: null,
		animation: null,
		startGame: null,
		loadGame: null,
		extras: null,
		setting: null,
		credit: null,
		quitGame: null
				
	},
	
	gameUI: {
		gameEnv: null,
		hud: null,
		inventory: {
			button: null,
		},
		dialogue: {
			container: null,
			dialogueText: null,
			speakerDisplay: null,
			dialogueHistory: {
				historyButton: null,
				historyLog: null
			}
		},
		miniMap: {}
	},
	
	settingsUI: {
	},
	
	lazyloadStartscreen() {
		this.startscreen.div = document.getElementById('startscreen');
		this.startscreen.title = document.getElementById('startscreen-title');
		this.startscreen.animation = document.getElementById('startscreen-animation');
		this.startscreen.startGame = document.getElementById('startscreen-startgame');
		this.startscreen.loadGame = document.getElementById('startscreen-loadgame');
		this.startscreen.extras = document.getElementById('startscreen-extras');
		this.startscreen.setting = document.getElementById('startscreen-setting');
		this.startscreen.credit = document.getElementById('startscreen-credit');
		this.startscreen.quitGame = document.getElementById('startscreen-quitgame');
	},
	
	lazyloadGameUI() {
		this.gameUI.gameEnv = document.getElementById('game-environment');
		this.gameUI.dialogue.container = document.getElementById('dialogue-container');
		this.gameUI.dialogue.speakerDisplay = document.getElementById('dialogue-speaker');
		this.gameUI.dialogue.dialogueHistory.historyButton = document.getElementById('dialogue-historybtn');
		this.gameUI.dialogue.dialogueHistory.historyLog = document.getElementById('dialogue-history-container');
		this.gameUI.dialogue.dialogueText = document.getElementById('dialogue-text');
	},
	
	lazyloadSettingsUI() {
		
	}
};