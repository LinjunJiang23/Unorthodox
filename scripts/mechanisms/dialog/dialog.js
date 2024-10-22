// scripts/mechanisms/dialog/dialog.js
let currentIndex = 0;

function showNextDialog() {
  if ($(".dialog-container").length !== 0) {	   
	let cur_part = nodeManager.getDialog()[nodeManager.current_index] 
	console.log(cur_part);
	let contents = cur_part.content;
	let speaker = cur_part.speaker;
	if (speaker) {
	  $('span.dialog-speaker').text(speaker);
	} else {
	  $('span.dialog-speaker').text('');
	}
	  
	if (currentIndex < contents.length) {	
	  let dialog = contents[currentIndex];
	  if (!typeWriter.getIsTyping()) {
        $('.dialog-text').text(''); // Clear previous text before typing
      }
		
	  if (dialog.effect) {
		applyEffects(dialog.effect);
	  } else {
		resetEffects();
	  }
	  if (dialog.type) {
	    applyTypeWriter(dialog.text, dialog.type);
	  } else {
		$('.dialog-text').text(dialog.text);
	  }	
	  currentIndex++;
	} else {
		//Reached the end of the dialogs
		//If choices exist
	  if (cur_part.choices) {
	    myPromise
		.then(() => {
		  $(".dialog-text").text("");
		})
		.then(() => {
		  showChoices(cur_part.choices);
		});
	  }
	  nodeManager.current_index++;
	  currentIndex = 0;
    }
  }
};

function applyEffects(effect) {
	switch (effect) {
        case "shake":
            $('.dialog-text').addClass('shake-effect');
            break;
        case "colorChange":
            $('.dialog-text').css('color', 'red');
            break;
        // Add more cases for other effects
    }
};

function resetEffects() {
	$('.dialog-text').css('color', 'white');
	$('.dialog-text').removeClass('shake-effect');
};

function applyTypeWriter(str, type) {
	switch(type) { 
		case "normal":
			console.log('Normal typewriter triggered');
			typeWriter.type(str, '.dialog-text', 100);
			break;
		case "slow":
			typeWriter.type(str, '.dialog-text', 500);
			break;
		case "fast":
			typeWriter.type(str, '.dialog-text', 10);
			break;
	}
};

	
$(document).on('click', '.dialog-box', function() {
	//If typewriter isn't done typing, finishing the typing quickly.
	if (typeWriter.getIsTyping()) {	
		typeWriter.finishType();
	} else {
		//If typewriter is done typing, show the next line of dialog.
		$('.dialog-text').text('');
		showNextDialog();
	}
});
