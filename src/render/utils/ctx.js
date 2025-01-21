const CTX = {
	debug: {
				
	},
	
	dialogue: {
		portrait: null
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
	
	lazyloadEnvironmentCTX() {
		this.environment.weather = document.getElementById('canvas-env-weather').getContext('2d');
		this.environment.lighting = document.getElementById('canvas-env-lighting').getContext('2d');
		this.environment.specialized = document.getElementById('canvas-env-specialized').getContext('2d');
		this.environment.particle = document.getElementById('canvas-env-particle').getContext('2d');
		this.environment.team = document.getElementById('canvas-env-team').getContext('2d');
		this.environment.NPC = document.getElementById('canvas-env-NPC').getContext('2d');
		this.environment.interactables = document.getElementById('canvas-env-interactables').getContext('2d');
		this.environment.terrain = document.getElementById('canvas-env-terrain').getContext('2d');
		this.environment.background = document.getElementById('canvas-env-background').getContext('2d');
	},
	
	lazyloadDialogueCTX() {
		this.dialogue.portrait = document.getElementById('canvas-portrait').getContext('2d');
	},
	
	lazyloadDebugCanvas() {
	
	},
	
	get_ctx(keys) {
	let current = this.ctx;
	for (let key of keys) {
	  if (current[key]) {
		current = current[key];
	  } else {
		console.error('CTX not found');
		return; // Exit if a key is invalid
	  }
	}
	return current;
  }
};