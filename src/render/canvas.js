// src/engine/render/canvas.js

const canvas = {
	debug: {
				
	},
	
	ui: {
	},
	
	environment: {
		weather: null,
		lighting: null,
		//specialized layer for stealth indicators, vision cones, or area of effect markers
		specialized: null,
		//Layer for particle system
		particle: null,
		team: null,
		NPC: null,
		interactables: null,
		terrain: null,
		background: null
	},
	
	lazyloadEnvironmentCanvas() {
		this.environment.weather = document.getElementById('canvas-env-weather');
		this.environment.lighting = document.getElementById('canvas-env-lighting');
		this.environment.specialized = document.getElementById('canvas-env-specialized');
		this.environment.particle = document.getElementById('canvas-env-particle');
		this.environment.team = document.getElementById('canvas-env-team');
		this.environment.NPC = document.getElementById('canvas-env-NPC');
		this.environment.interactables = document.getElementById('canvas-env-interactables');
		this.environment.terrain = document.getElementById('canvas-env-terrain');
		this.environment.background = document.getElementById('canvas-env-background');
	},
	
	lazyloadDebugCanvas() {
	}
};