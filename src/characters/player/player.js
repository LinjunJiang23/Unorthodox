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
		this.state = "idle";
		this.action = "rest";
		this.composure = 100;
		this.intro = 
			`Still familiar with the silhouette in mirror. How fascinating is that?
			镜中人仍熟悉，何等精妙？`;
    }
	
	init() {
		this.stats = new Stat();
		this.inventory = new Inventory([]);
		this.traits = new CharacterTraitManager([
			new Trait('老大', '陈桥的老大', true, 'relationship', 100),
			new Trait('家人', '陈汝的家人', true, 'relationship', 100)
		]);
		this.app = new PlayerAppManager(this);
		this.model = new PlayerModel(this);
		this.actions = new ActionManager(this);
		this.relationshipManager = new RelationshipManager();
	}
	
	update(timestamp) {
		this.model.update(timestamp);
	}
	
	set_mode(mode) {
		if (Player.validModes.includes(mode)) {
			if (this.mode !== mode) this.mode = mode;
		} else {
			throw new Error("Unrecognized mode: ", mode);
		}
	}
	
	set_state(state) {
		if (Player.validStates.includes(state)) {			
			if (this.state !== state) this.state = state;
		} else {
			throw new Error('Unrecognized state: ', state);
		}
	}
	
	set_action(action) {
		if (Player.validActions.includes(action)) {
			if (this.action !== action) this.action = action;
		} else {
			throw new Error('Unrecognized action: ', action);
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
	
	get_position() {
		return {x: this.model.physics.x, y: this.model.physics.y};
	}
};
