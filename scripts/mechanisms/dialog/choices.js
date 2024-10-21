// scripts/mechanisms/dialog/choices.js

/**
 * showChoices - function
 * @param {Array} choices
 */
function showChoices(choices) {
  // Check if the choices container exists before appending
  if ($('.choices-container').length !== 0) {
    // Clear existing choices if necessary
    $('.choices-container').empty();

    // Use forEach to iterate through the choices
    choices.forEach((choice, index) => {
      // Append the choice with the correct index and text
      $('.choices-container').append(`<a class="choice-${index + 1}">${index + 1}. ${choice.text}</a><br>`);
      
	  //If choice leads dice roll
	  if (choice.hasOwnProperty("dice")) {
		  let choiceDice = choice.dice;
		if (choiceDice.hasOwnProperty("check")) {
			let choiceDiceCheck = choiceDice.check;
			if (choiceDiceCheck.hasOwnProperty("core-stat")) {
				choiceDiceCheck.core-stat.target === "player" ? 
					player.performCheck(player.stats.getCoreStats()[choiceDiceCheck.core-stat.type], choiceDiceCheck.core-stat.type, 1, parseInt(choiceDice.DC)) : 
					console.log('Not implemented... Placeholder for possible companian adaptation.');
			}
		}
	  }
	});
  }
};

