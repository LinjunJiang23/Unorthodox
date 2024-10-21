const playerCreated = new CustomEvent('playerInitialized');

/* Player Singleton */
class Player {
	constructor() {
        if (Player.instance) {
            return Player.instance;
        }
        Player.instance = this;
		this.name = "左汶";
		this.sex = 1;
		this.stats = new StatManager();
		this.inventory = new Inventory([]);
		this.traits = new CharacterTraitManager([new Trait('妹宝', '小妹对你十分爱护', true, 'relationship', 100)]);
    }
	
	getModifier(stat) {
		return Math.floor((stat - 10) / 2);
	}
	
	performCheck(stat, type, numOfDice, difficulty) {
		if (typeof stat === "number" && this.hasOwnProperty(type) && 
		    typeof difficulty === "number" && typeof numOfDice === "number") {
		  const modifier = this.getModifier(stat);
		  const result = d20.rollDice(numOfDice, modifier);
		  if (difficulty < result) {
			$('.box-choices').hide();
			//Replace with dice rolling animation
			typeWriter(`${this.name}进行了一次判定，结果为:${result},成功!`, '.dice-attempt', 100, () => {document.dispatchEvent(diceRolled);resolveDice(true);}).type();
		  } else {
			$('.box-choices').hide();
			//Replace with dice rolling animation
			typeWriter(`${this.name}进行了一次判定，结果为:${result},失败!`, '.dice-attempt', 100, () => {document.dispatchEvent(diceRolled);resolveDice(false);}).type();
		  }
		} else {
			console.log('Error occurs, probably because of wrong parameters');
		}	
	}
};

/* For Player */
let player = new Player();

