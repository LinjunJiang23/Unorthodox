// src/characters/player/player.js

/** 
 * 
 */
class Player extends BaseCharacter {
	static validStates = ['idle', 'walk', 'run', 'backup', 'jump'];
	static validActions = ['rest', 'hold', 'lift', 'drop', 'drag'];
	
	constructor(logic) {
		super();
		this.logic = logic;
		this.tag = 'player';
		this.lname = "左";
		this.fname = "汶";
		this.intro = 
			"We still recognize ourselves in the mirrors. How fascinating is that?";
    }
	
	init() {
		this.state = "idle";
		this.action = "rest";
		this.stats = new StatManager();
		this.inventory = new Inventory([]);
		this.traits = new CharacterTraitManager([
			new Trait('老大', '陈桥的老大', true, 'relationship', 100),
			new Trait('家人', '陈汝的家人', true, 'relationship', 100)
		]);
		this.app = new PlayerAppManager(this);
		this.model = new PlayerModel(this);
		this.stabilization = 100;
		this.actions = new ActionManager(this);
	}
	
	update(timestamp) {
		this.model.update(timestamp);
	}
	
	set_mode(mode) {
		if (Player.validModes.includes(mode)) {
			if (this.mode !== mode) {
				this.mode = mode;
			}
		}
	}
	
	set_state(state) {
		if (Player.validStates.includes(state)) {
			(state === 'idle') ? this.model.animationSpeed = 500 : this.model.animationSpeed = 180;
			switch (state) {
				case 'walk':
					if (this.state !== 'walk') this.state = "walk";
					break;
				case 'run':
					if (this.state !== 'run') this.state = "run";
					break;
				case 'backup':
					if (this.state !== 'backup') this.state = "backup";
					break;
				case 'jump':
					if (this.state !== 'jump') this.state = "jump";
					break;
				default:
					if (this.state !== "idle") this.state = 'idle';
					if (this.model.animationSpeed !== 500) this.model.animationSpeed = 500;
					break;
			}
		}
	}
	
	set_action(action) {
		if (Player.validActions.includes(action)) {
			switch(action) {
				case 'hold': 
					if (this.action !== 'hold') this.action = 'hold';
					break;
				case 'lift':
					if (this.action !== 'lift') this.action = 'lift';
					break;
				case 'drop':
					if (this.action !== 'drop') this.action = 'drop';
				default:
					if (this.action !== "rest") this.action = 'rest';
					break;
			}
		}
	}

	/** 
	 * sets player's first name and last name
	 * currently allows for the option of no first name or no last name
	 * @param {object} name - takes the format of {lname: '', fname: ''}
	 */
	set_name(name) {
		if (name.hasOwnProperty('fname') && name.hasOwnProperty('lname')) {
			this.lname = name.lname;
			this.fname = name.fname;
		} else {
			console.log('Player Name Input Format is not correct, the current format is: ', name);
			console.log('Expected format like: {lname: "左", fname: "汶"}');
		}
	}
	

	get_name() {
		return {lname: this.lname, fname: this.fname};
	}
	
	get_CoreStats() {
		return this.stats.getCoreStats();
	}
	
	get_DerivedStats() {
		return this.stats.getDerivedStats();
	}
	
	get_position() {
		return {x: this.model.physics.x, y: this.model.physics.y};
	}
};
