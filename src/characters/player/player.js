// src/characters/player/player.js

/** 
 * 
 */
class Player extends BaseCharacter {
	
	constructor() {
		super();
		this.tag = 'player';
		this.lname = "左";
		this.fname = "汶";
		this.intro = "";
    }
	
	init() {		
		this.stats = new StatManager();
		this.inventory = new Inventory([]);
		this.traits = new CharacterTraitManager([
			new Trait('老大', '陈桥的老大', true, 'relationship', 100),
			new Trait('家人', '陈汝的家人', true, 'relationship', 100)
		]);
		this.app = new PlayerAppManager(this);
		this.model = new CompanionAnimation(this);
		this.stabilization = 100;
		this.actions = new ActionManager(this);
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
