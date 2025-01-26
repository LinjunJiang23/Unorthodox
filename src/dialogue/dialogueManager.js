// src/dialogue/dialogueManager.js

/**
 * @class
 * Handles dialogue presentation, user interaction, manages dialogue-related tasks such as:
 * displaying text, handling player choices, progressing through dialogue trees
 * Also receives instructions from the script manager 
 */
class DialogueManager {
  constructor(eventManager, inputHandler) {
	this.eventManager = eventManager;
	this.inputHandler = inputHandler;
	this.currentDialogue;
	this.defaultSpeaker;
	this.currentDialogueLineIndex = 0;
	this.disableClickAdvance = true;
	this.initiate_listeners();
	this.autoOn = false;
  }
	
  start_dialogue(dialogues, defaultSpeaker) {
	this.eventManager.trigger('showUI', {uiArray: ['gameUI', 'dialogue', 'dialogue'] });
	this.currentDialogue = dialogues;
	this.disableClickAdvance = false;
	this.defaultSpeaker = defaultSpeaker;
	this.currentDialogueLineIndex = 0;
	this.append_dialogue();
  }
	
  append_dialogue() {
	const currentLine = this.currentDialogue[this.currentDialogueLineIndex];
	console.log("This is the currentLine", currentLine);
    if (currentLine.noClear !== true) this.eventManager.trigger('clearText', { uiArray: ['gameUI', 'dialogue', 'dialogueText'] });
	
	const speaker = currentLine.speaker || this.defaultSpeaker;
		
	if (speaker) {
	  this.eventManager.trigger('displayPlainText', { uiArray: ['gameUI', 'dialogue', 'speakerDisplay'],
	    textObject: {
		  text: speaker.name
		}});
	  //if (speaker.portrait) this.eventManager.trigger('renderSpeakerPortrait', {speaker});
	}				
	this.eventManager.trigger('processText', { uiArray: ['gameUI', 'dialogue', 'dialogueText'], textObject: currentLine });
	this.append_dialogue_history({text: currentLine.text, speaker});
  }
	
  append_dialogue_history(historyObject) {
    this.eventManager.trigger('updateUI', { uiArray: ['gameUI', 'dialogue', 'dialogueHistory', 'historyLog'], cb: (current) => {
	  if (historyObject.speaker) {
	    const sp = document.createElement('span');
	    sp.className = "dialogue-history-speaker";
	    sp.textContent = historyObject.speaker.name;
	    current.appendChild(sp);
	  }

	  if (historyObject.text) {
	    const tx = document.createElement('span');
	    tx.className = 'dialogue-history-text';
	    tx.textContent = historyObject.text;
		current.appendChild(tx);
	  }
		
	  if (historyObject.choice) {
		const ch = document.createElement('span');
	    ch.className = 'dialogue-history-choice';
	    ch.textContent = historyObject.choice;
		current.appendChild(ch);
	  }
	}});	
  }
	
  clear_dialogue_history() {
	this.eventManager.trigger('updateUI', {uiArray: ['gameUI', 'dialogue', 'historyLog'], cb: 
	(current) => {
	  while (current.firstChild) {
	    current.removeChild(current.firstChild);
	  }
	}});
  }
  
  handle_text_typing() {
    this.eventManager.trigger('onTextTyping', {
      cb: (isTyping, str) => this.on_text_typing_complete(isTyping)
    });
  }

  on_text_typing_complete(isTyping) {
    if (isTyping) {
	  console.log("Still typing");
      this.handle_text_typing_in_progress();
    } else {
	  console.log("Not typing anymore");
      this.advance_dialogue();
    }
  }

  handle_text_typing_in_progress() {
    this.eventManager.trigger('finishTextTyping', { uiArray: ['gameUI', 'dialogue', 'dialogueText'] });
  }

  advance_dialogue() {
	if (this.currentDialogueLineIndex < this.currentDialogue.length - 1) {
	  this.currentDialogueLineIndex++;
	  this.append_dialogue();
	} else {
	  if (this.currentDialogueLineIndex = this.currentDialogue.length - 1)
	    this.finished_dialogue();
	}
  }
	
  finished_dialogue() {
	console.log("Finished dialogue is triggereed");
    this.currentDialogue = null;
	this.currentDialogueLineIndex = 0;
	this.defaultSpeaker = null;
	this.disableClickAdvance = true;
	this.eventManager.trigger('finishedDialogueAppending', {});

  }
  
  reached_end_of_dialogue() {
    
  }
  
  close_dialogue() {
	this.finished_dialogue();
	this.eventManager.trigger('hideUI', { uiArray: ['gameUI', 'dialogue', 'dialogue'] });
  }
  
  end_dialogue() {
  }
  
  auto_advance() {
    if (this.autoOn) {
	  this.eventManager.trigger('onTextTyping', {cb: (isTyping, str) => {
		if (!isTyping) setTimeout(this.advance_dialogue(), 100);
	  }});
	}
  }
  
  toggle_auto() {
    this.autoOn = !this.autoOn;		
  }
  
  initiate_listeners() {
	this.inputHandler.add_mouse_handler("click", 'dialogue-historybtn', 
	  (payload) => this.eventManager.trigger('showUI', 
	  { uiArray: ['gameUI', 'dialogue', 'dialogueHistory', 'container'] }));
	
	this.inputHandler.add_mouse_handler('click', 'dialogue-history-closebtn',
	  (payload) => this.eventManager.trigger('hideUI', 
	  { uiArray: ['gameUI', 'dialogue', 'dialogueHistory', 'container'] }));
	this.eventManager.on('renderSpeakerPortrait', (payload) => {
	  this.eventManager.logic.engine.renderManager.render_speaker_portrait(payload);
	});
	this.inputHandler.add_mouse_handler( "click", 'dialogue-text', (payload) => {
	  if (this.disableClickAdvance) return;
	  this.handle_text_typing();	
	});
	this.eventManager.on('reachedEndOfDialogue', (payload) => this.reached_end_of_dialogue());
	this.eventManager.on('startDialogue', (payload) => {
	  this.start_dialogue(payload.dialogues, payload.defaultSpeaker);
	});
  }
};