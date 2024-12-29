// src/mechanisms/action/performCheck/performCheck.js

function performCheck(stat, type, numOfDice, dc) {
		if (typeof stat[type] === "number" && 
		    typeof dc === "number" && 
			typeof numOfDice === "number") {
				
		  const modifier = getModifier(stat);
		  const result = d20.rollDice(numOfDice, modifier);
		  
		  if (dc <= result) {
			return true;
		  } else {
			return false;
		  }
		} else {
			console.log('Error occurs, probably because of wrong parameters');
		}	
};