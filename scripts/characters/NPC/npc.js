// scripts/mechanisms/NPC/npc.js

/** 
 * NPC base class
 * @class
 * @property {string} intro - short summary of characters
 * @property {number} fl - friendliness
 * @property {number} idf - indifference
 * @property {number} it - intent
 */
class NPC {
  /** @static */
  static validPersonality = [
	'indifferent', 'aggresive', 'coward', 'gentle', 'provocative'
  ];
  
  constructor(name = "Unknown", intro = "Unknown", type = "Unknown", fl = 0, idf = 0, it = 0) {
	(typeof name === "string") ? this.name = name : this.name = "Unknown";
    (typeof intro === "string") ? this.intro = intro : this.intro = "Unknown";
    (typeof type === "string") ? this.type = type : this.type = "Unknown";
	//Evals for relationship check
    (typeof fl === "number" && fl >= 0) ? this.fl = fl : this.fl = 0;
    (typeof idf === "number" && idf >= 0) ? this.idf = idf : this.idf = 0;
    (typeof it === "number" && it >= 0) ? this.it = it : this.it = 0;
	
    this.relationships = [];
	this.gold = 0;
	this.inventory = new Inventory();
	this.path = [];
	this.schedule = null;
	this.animation = new npcAnimation(this);
  }
  
  moveToNextGrid(timestamp, speed = 20) {
	if (this.path.length > 0) {
		const nextPoint = this.path[0]; //Peek at the next point
		let dx = nextPoint.x - this.animation.physics.x;
		let dy = nextPoint.y - this.animation.physics.y;
		let distance = Math.sqrt(dx * dx + dy * dy);

		const TOLERANCE = 0.01;
		if (distance > TOLERANCE) {
			const deltaTime = Math.max((timestamp - lastUpdate) / 1000, 0.001);
			const step = speed * deltaTime;
			
			if (distance > step) {
				this.animation.direction = getDirection(dx, dy);
				(speed === 20) ? this.animation.changeState('walk') : this.animation.changeState('run');
				this.animation.physics.x += (dx / distance) * step;
				this.animation.physics.y += (dy / distance) * step;
			} else {
				this.animation.physics.x = nextPoint.x;
				this.animation.physics.y = nextPoint.y;
				this.path.shift();
		    }
	    } else {
			this.animation.changeState('idle');
		}
		this.animation.updateAnimation(timestamp);
	}
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
  
  collideWithObjects() {
  }
	
  collideWithPlayer() {
  }
  
};

const aStarPathFinder = new AStarPathFinding();

const npc = new NPC('Guard');

// Define destination
const destination = { x: 10, y: 10 };

// Calculate path
npc.path = aStarPathFinder.aStar({x: npc.animation.physics.x, y: npc.animation.physics.y}, destination);
