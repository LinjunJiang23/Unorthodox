// scripts/characters/player/player.js

const playerCreated = new CustomEvent('playerInitialized');

/** 
 * Player Singleton 
 */
class Player {
	/**
	 *
	 */
	constructor() {
        if (Player.instance) {
            return Player.instance;
        }
        Player.instance = this;
		this.init();
    }
	
	init() {
		this.type = 'player';
		this.lname = "左";
		this.fname = "汶";
		this.stats = new StatManager();
		this.inventory = new Inventory([]);
		this.traits = new CharacterTraitManager([
			new Trait('老大', '陈桥的老大', true, 'relationship', 100),
			new Trait('家人', '陈汝的家人', true, 'relationship', 100)
		]);
		this.app = new PlayerAppManager(this);
		this.model = new CompanionAnimation(this);
	}
	
	performCheck(stat, type, numOfDice, difficulty) {
		if (typeof stat === "number" && 
		    typeof this.stats.getCoreStats()[type] === "number" && 
		    typeof difficulty === "number" && 
			typeof numOfDice === "number") {
		  const modifier = getModifier(stat);
		  const result = d20.rollDice(numOfDice, modifier);
		  if (difficulty < result) {
			return true;
		  } else {
			return false;
		  }
		} else {
			console.log('Error occurs, probably because of wrong parameters');
		}	
	}
	
	// Start of SETTERs
	/** 
	 * sets player's first name and last name
	 * currently allows for the option of no first name or no last name
	 * @param {object} name - takes the format of {lname: '', fname: ''}
	 */
	setName(name) {
		if (name.hasOwnProperty('fname') && name.hasOwnProperty('lname')) {
			this.lname = name.lname;
			this.fname = name.fname;
		} else {
			console.log('Player Name Input Format is not correct, the current format is: ', name);
			console.log('Expected format like: {lname: "左", fname: "汶"}');
		}
	}
	
	// End of SETTERs
	
	// Start of GETTERs
	/**
	 */
	getName() {
		return {lname: this.lname, fname: this.fname};
	}
	
	getSex() {
		return this.sex;
	}
	
	getCoreStats() {
		return this.stats.getCoreStats();
	}
	
	getDerivedStats() {
		return this.stats.getDerivedStats();
	}
	// End of GETTERs
};

/* For Player */
const player = new Player();

