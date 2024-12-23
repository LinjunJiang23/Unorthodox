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
	this.model = new npcAnimation(this);
  }
  
  moveToNextGrid(timestamp, speed = 20) {
	if (this.path.length > 0) {
		const nextPoint = this.path[0]; //Peek at the next point
		let dx = nextPoint.x - this.model.physics.x;
		let dy = nextPoint.y - this.model.physics.y;
		let distance = Math.sqrt(dx * dx + dy * dy);

		const TOLERANCE = 0.01;
		if (distance > TOLERANCE) {
			const deltaTime = Math.max((timestamp - lastUpdate) / 1000, 0.001);
			const step = speed * deltaTime;
			
			if (distance > step) {
				this.model.direction = getDirection(dx, dy);
				(speed === 20) ? this.model.changeState('walk') : this.model.changeState('run');
				this.model.physics.x += (dx / distance) * step;
				this.model.physics.y += (dy / distance) * step;
			} else {
				this.model.physics.x = nextPoint.x;
				this.model.physics.y = nextPoint.y;
				this.path.shift();
		    }
	    } else {
			this.model.changeState('idle');
		}
		this.model.updateAnimation(timestamp);
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
npc.model.physics.x = 100;
npc.model.physics.y = 100;

npc.model.physics.addTriggerCollider({maxX: 10, maxY: 10});

const triggerColliders = [];
triggerColliders.push(npc.model.physics.triggerCollider);

// Define destination
// const destination = { x: 100, y: 100 };

// Calculate path
// npc.path = aStarPathFinder.aStar({x: npc.model.physics.x, y: npc.model.physics.y}, destination);
