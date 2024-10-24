const playerCreated = new CustomEvent('playerInitialized');
/* Player Singleton */
class Player {
	constructor() {
        if (Player.instance) {
            return Player.instance;
        }
        Player.instance = this;
		this.lname = "左";
		this.fname = "汶";
		this.sex = 1;
		this.stats = new StatManager();
		this.inventory = new Inventory([]);
		this.traits = new CharacterTraitManager([new Trait('妹宝', '小妹对你十分爱护', true, 'relationship', 100)]);
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
};

/* For Player */
let player = new Player();

