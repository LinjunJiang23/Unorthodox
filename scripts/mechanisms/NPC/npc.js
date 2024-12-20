// scripts/mechanisms/NPC/npc.js

/** 
 * NPC base class
 * @class
 * @property {Object} currentLocation
 * @property {string} currentState 
 * @property {boolean} isMoving 
 * @property {boolean} isIdle 
 * @property {number} currentFrame 
 * @property {string} direction 
 * @property {number} animationSpeed 
 * @property {number} lastUpdateTime 
 * @property spriteSheets
 */
class NPC {
  /**
   * @static
   */
  static validPersonality = [
	'indifferent', 'aggresive', 'coward', 'gentle', 'provocative'
  ];
  
  /**
   * @class
   * @param {string} intro - short intro of characters when examined
   * @param {number} friendliness - attitude check
   * @param {number} indifference - how they react to player's behaviors
   * @param {number} intent - interest in you know what
   */
  constructor(name = "?", intro = "Unknown", friendliness = 0, indifference = 0, intent = 0) {
	if (typeof name === "string") this.name = name;
    if (typeof intro === "string") this.intro = intro;
    
	//Critical evals for relationship check
    if (typeof friendliness === "number") this.friendliness = friendliness;
    if (typeof indifference === "number") this.indifference = indifference;
    if (typeof intent === "number") this.intent = intent;
	
    this.relationships = []; //Object to store relationships within characters
	this.gold = 0;
	this.inventory = new Inventory();
	this.path = [];
	this.schedule = null;
	this.animation = new npcAnimation();
  }
  
/*   chat() {
  }
  
  cuss() {
  }
  
  confess() {
  }
  
  assault() {
  }
  
  psychAccess() {
  } */
  
  moveToNextGrid(timestamp, speed = 2) {
	if (this.path.length > 0) {
		const nextPoint = this.path[0]; //Peek at the next point
		let dx = nextPoint.x - this.animation.x;
		let dy = nextPoint.y - this.animation.y;
		let distance = Math.sqrt(dx * dx + dy * dy);

		if (dx > 0 && dy == 0) {
			this.animation.direction = 'right';
		} else if (dx == 0 && dy < 0) {
			this.animation.direction = 'up';
		} else if (dx == 0 && dy > 0) {
			this.animation.direction = 'down';
		} else if (dx < 0 && dy == 0) {
			this.animation.direction = 'left';
		} else if (dx > 0 && dy < 0) {
			this.animation.direction = 'upright';
		} else if (dx > 0 && dy > 0) {
			this.animation.direction = 'downright';
		} else if (dx < 0 && dy < 0) {
			this.animation.direction = 'upleft';
		} else if (dx < 0 && dy > 0) {
			this.animation.direction = 'downleft';
		}
		
		if (distance > 0) {
			let step = speed * timestamp;
			this.animation.updateAnimation(timestamp);
		} else {
			this.animation.x = nextPoint.x;
			this.animation.y = nextPoint.y;
		}
	}
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
  
  getPosition() {
	return this.position;
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

const aStarPathFinder = new AStarPathFinding();

const npc = new NPC('Guard');

// Define destination
const destination = { x: 10, y: 10 };

// Calculate path
npc.path = aStarPathFinder.aStar({x: npc.animation.x, y: npc.animation.y}, destination);

//Move NPC along the path
  setInterval(() => {
    if (npc.path.length > 0) {
        npc.moveToNextGrid();
        console.log(`NPC moved to: (${npc.animation.x}, ${npc.animation.y})`);
    } else {
        console.log('NPC reached destination!');
        clearInterval(this);
    }
}, 1000); // Move every second
