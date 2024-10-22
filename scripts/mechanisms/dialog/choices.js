/**
 * showChoices - function
 * @param {Array} choices
 */
function showChoices(choices) {
    // Use forEach to iterate through the choices
    choices.forEach((choice, index) => {
      // Append the choice to the choices container
      $('.dialog-text').append(`<a class="choice">${index + 1}. ${choice.text}</a><br>`);

      // Add an event listener for the specific choice using closure
      $('.choice').last().on('click', () => {
        // Handle dice-related logic inside the event listener
        if (choice.hasOwnProperty("dice")) {
          let choiceDice = choice.dice;
          if (choiceDice.hasOwnProperty("check")) {
            let choiceDiceCheck = choice.dice.check;
            if (choiceDiceCheck.hasOwnProperty("core-stat")) {
              // Check if the target is the player and perform the dice roll
              if (choiceDiceCheck["core-stat"].target === "player") {
				let result = player.performCheck(
                  player.stats.getCoreStats()[choiceDiceCheck["core-stat"].type],
                  choiceDiceCheck["core-stat"].type,
                  1,
                  parseInt(choiceDice.DC)
                );
				if (result) {
					let result_success = choiceDice["outcome"].success;
					$('.dialog-text').empty();
					typeWriter.type(result_success.text, '.dialog-text', 100);
					if (result_success.hasOwnProperty("relationship")) {
						console.log("Placeholder for relationship changes");
					}
				} else {
					let result_fail = choiceDice["outcome"].fail;
					$('.dialog-text').empty();
					typeWriter.type(result_fail.text, '.dialog-text', 100);
				}
              } else {
                console.log('Not implemented... Placeholder for possible companion adaptation.');
              }
            }
          }
		  //Proceed to next_node if no other next node encountered
		  if (choice.hasOwnProperty('next_node')) {
			nodeManager.goToNextNode(choice.next_node);
		  }
        }
        // Additional logic for choices without dice rolls can go here
        console.log(`Choice ${index + 1} clicked.`);
      });
    });
}


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