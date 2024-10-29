// scripts/mechanisms/dialog/dialog.js

let currentIndex = 0; //Dialog Line index

function showNextDialog() {
  if ($(".dialog-container").length !== 0) {	   
	if (!nodeManager.getDialog()[nodeManager.current_index]) {$('.dialog-container').hide();  nodeManager.resetCurrentIndex(); return;};
	let cur_part = nodeManager.getDialog()[nodeManager.current_index];
	let contents = cur_part.content;
	let speaker = cur_part.speaker;
	
	//Handle speaker
	if (speaker) {
	  $('span.dialog-speaker').text(speaker.name); //Append speaker name
	  renderSpeakerIcon(speaker);
	} else {
	  $('span.dialog-speaker').text('');
	}
	  
	if (currentIndex < contents.length) {	
	  let dialog = contents[currentIndex];
	  if (!(dialog.hasOwnProperty("history"))) {
	    dialogHistory.saveDialog({
		  speaker: (speaker ? speaker.name : ''),
		  text: dialog.text
	    });
	  }
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
	  //Reached the end of the current dialogue
	  currentIndex = 0;

	  //If choices exist
	  if (cur_part.choices) {
	    myPromise
	    .then(() => {
		  $(".dialog-text").text("");
	      $(".dialog-text").toggleClass("choice");
	    })
	    .then(() => {
		  showChoices(cur_part.choices);
	    });
	  } else {
       //Move on to the next possible dialogue
       let r = nodeManager.incCurrentIndex(); 
       if (r) {
		   showNextDialog();
	   } else {
		   $('.dialog-container').hide();
	   }
     }
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
			typeWriter.type(str, '.dialog-text', 60);
			break;
		case "slow":
			typeWriter.type(str, '.dialog-text', 500);
			break;
		case "fast":
			typeWriter.type(str, '.dialog-text', 1);
			break;
	}
};

	
$(document).on('click', 'div[class="dialog-text"]', function() {
	//If typewriter isn't done typing, finishing the typing quickly.
	if (typeWriter.getIsTyping()) {	
		typeWriter.finishType();
	} else {
		//If typewriter is done typing, show the next line of dialog.
		$('.dialog-text').text('');
		showNextDialog();
	}
});
