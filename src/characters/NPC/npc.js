// scripts/mechanisms/NPC/npc.js

/** 
 * NPC base class
 * @class
 * @property {number} fl - friendliness
 * @property {number} idf - indifference
 * @property {number} it - intent
 */
class NPC extends BaseCharacter {
  static validPersonality = [
	'indifferent', 'aggresive', 'coward', 'gentle', 'provocative'
  ];
  
  constructor(name = "Unknown", intro = "Unknown", tag = "Unknown", fl = 0, idf = 0, it = 0) {
	super();
	(typeof name === "string") ? this.name = name : this.name = "Unknown";
    (typeof intro === "string") ? this.intro = intro : this.intro = "Unknown";
    (typeof tag === "string") ? this.tag = tag : this.tag = "Unknown";
	
	//Evals for relationship check
    (typeof fl === "number" && fl >= 0) ? this.fl = fl : this.fl = 0;
    (typeof idf === "number" && idf >= 0) ? this.idf = idf : this.idf = 0;
    (typeof it === "number" && it >= 0) ? this.it = it : this.it = 0;
	
    this.relationships = [];
	this.gold = 0;
	this.path = [];
	this.schedule;
  }
  
  init() {
	this.inventory = new Inventory();
	this.model = new npcAnimation(this);
  }
  
  move_to_next_grid(timestamp, speed = 20) {
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
				this.model.set_direction(getDirection(dx, dy));
				(speed === 20) ? this.model.set_state('walk') : this.model.set_state('run');
				this.model.physics.x += (dx / distance) * step;
				this.model.physics.y += (dy / distance) * step;
			} else {
				this.model.physics.x = nextPoint.x;
				this.model.physics.y = nextPoint.y;
				this.path.shift();
		    }
	    } else {
			this.model.set_state('idle');
		}
		this.model.update_animation(timestamp);
	}
  }
  
  get_core_stats() {
	const stats = {
		fl: this.fl,
		idf: this.idf,
		it: this.it,
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
  
  psych_access() {
  }
  
  collide_with_objects() {
  }
	
  collide_with_player() {
  }
};


// const npc = new NPC('Guard');
// npc.model.physics.x = 100;
// npc.model.physics.y = 100;

// npc.model.physics.add_TriggerCollider({maxX: 10, maxY: 10});

// triggerColliders.push(npc.model.physics.triggerCollider);

// Define destination
// const destination = { x: 100, y: 100 };

// Calculate path
// npc.path = aStarPathFinder.aStar({x: npc.model.physics.x, y: npc.model.physics.y}, destination);
