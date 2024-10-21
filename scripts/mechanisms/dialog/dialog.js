let currentIndex = 0;
let dialogs = [];

function showNextDialog() {
  if ($(".dialog-container").length !== 0) {
	if($("span.dialog-speaker").length === 0 && 
	   $(".dialog-box").length === 0) {
	    $(".dialog-container").append('<span class="dialog-speaker"></span>');
	    $(".dialog-container").append('<div class="dialog-box"><div class="dialog-text"></div></div>');		
	  }		   
	for (let cur_part of dialogs) {
	    let contents = cur_part.content;
	    let speaker = cur_part.speaker;
	    if (speaker) {
		  $('span.speaker').text(speaker);
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
			  $(".dialog-box").append('<div class="choices-container"></div>');
			})
			.then(() => {
			  showChoices(cur_part.choices);
			});
		  } else {
			//else, simply close the dialog box
			$('.dialog-box').hide();
		  }
		//Reset the dialogs
		dialogs = [];
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
