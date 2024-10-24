class Dice {
	constructor(dnum, modifier) {
		if (typeof dnum === "number") this.dnum = dnum;
	}
	
	setDNum(newDNum) {
		if (typeof dnum === "number") {
			this.dnum = newDNum;
		}
	}
	
	getDNum() {
		return this.dnum;
	}
	
	rollDice(numOfDice, modifier) {
		if (typeof modifier === "number" && typeof numOfDice === "number") {
			let result = 0;
			for (let i = 0; i < numOfDice; i++) {
			  result += ((Math.floor(Math.random() * 20) + 1) + modifier);
			}
			return result;
		}
	}
};


let d20 = new Dice(20);