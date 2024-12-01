// scripts/mechanisms/NPC/npc.js

/** 
 * NPC base class
 * @property {Function} chat
 * 
 */
class NPC {
  /**
   * @static
   */
  static validTypes = [
	'indifferent', 'aggresive', 'coward', 'gentle', 'provocative'
  ];
  
  /**
   * @class
   * @param {string} intro - short intro of characters when examined
   * @param {number} friendliness - attitude check
   * @param {number} indifference - how they react to player's behaviors
   * @param {number} intent - interest in you know what
   */
  constructor(name = "?", intro = "An unknown, hopefully living, being", friendliness = 0, indifference = 0, intent = 0) {
	if (typeof name === "string") this.name = name;
    if (typeof intro === "string") this.intro = intro;
    
	//Critical evals for relationship check
    if (typeof friendliness === "number") this.friendliness = friendliness;
    if (typeof indifference === "number") this.indifference = indifference;
    if (typeof intent === "number") this.intent = intent;
	
    this.relationships = []; //Object to store relationships within characters
	this.gold = 0;
	this.inventory = new Inventory();
	this.pathfinding = null;
	this.schedule = null;
  }
  
  chat() {
  }
  
  cuss() {
  }
  
  confess() {
  }
  
  assault() {
  }
  
  psychAccess() {
  }
  
  /**
	 * @property collideWithObjects
     */
	collideWithObjects() {
	}
	
	/**
	 * @property collideWithPlayer
	 */
	collideWithPlayer() {
	}
	
	getCoreStats() {
	const stats = {
		friendliness: this.friendliness,
		indifference: this.indifference,
		intent: this.intent,
		relationships: this.relationships,
	};
	return stats;
  }
};

/**
 * generateRandomName - a function to generate random names for NPCs
 */
function generateRandomName() {
	let name = {lname: "", fname: ""};
	//Generate a random number from 1 - 20
	let op = Math.floor(Math.random() * 20) + 1;  
	if (op === 13) { //Only has first name
		name.lname = null;
		//Generate a random number from 0 - 29
		let n = Math.floor(Math.random() * 30);
		name.fname = randomFName[n];
	} else if (op === 7) { //Only has last name
		name.fname = null;
		//Generate a random number from 0 - 29
		let n = Math.floor(Math.random() * 30);
		name.lname = randomLName[n];
	} else {
		//Character has first name and last name
		let n = Math.floor(Math.random() * 30);
		name.fname = randomFName[n];
		n = Math.floor(Math.random() * 30);
		name.lname = randomLName[n];
	}
	return name;
};
