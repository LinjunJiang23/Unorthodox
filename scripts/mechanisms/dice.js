const diceRolled = new CustomEvent('DiceRollFinished');

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

function resolveDice(result) {
	if ($('.dice-attempt').css('display') !== "none")
	{
		if (result) {
			let content = $('.result-success').text();
			$('.result-success').text('');
			$('.result-success').show();
			typeWriter(content, '.result-success', 100);
		} else {
			let content = $('.result-fail').text();
			$('.result-fail').text('');
			$('.result-fail').show();
			typeWriter(content, '.result-fail', 100);
		}
	}
};


let d20 = new Dice(20);

document.addEventListener('DiceRollFinished', () => {console.log('triggered');$('.dice-result').show();});
