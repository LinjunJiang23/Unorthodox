// src/dialogue/dialogueManager.js

/**
 * @class
 * Handles dialogue presentation, user interaction, manages dialogue-related tasks such as:
 * displaying text, handling player choices, progressing through dialogue trees
 * Also receives instructions from the script manager 
 */
class DialogueManager {
  constructor(eventManager) {
	this.eventManager = eventManager;
	this.dialogues;
	this.defaultSpeaker;
	this.dialogueNum = 0;
	this.dialogueLineIndex = 0;
	this.onComplete;
	this.disableClickAdvance = true;
	this.mouseHandler = this.eventManager.logic.engine.inputHandler.mouseHandler;
	
  }
	
  start_dialogue(dialogues, defaultSpeaker) {
	this.speakerNameEle = 
	  this.eventManager.logic.engine.ui.get_UI(['gameUI', 'dialogue', 'speakerDisplay']);
	this.dialogueTextEle = 
	  this.eventManager.logic.engine.ui.get_UI(['gameUI', 'dialogue', 'dialogueText']);
	this.dialogues = dialogues;
	this.defaultSpeaker = defaultSpeaker;
	this.dialogueNum = 0;
	this.dialogueLineIndex = 0;
	this.disableClickAdvance = false;
	this.append_dialogue();
  }
	
  append_dialogue() {
	let currentLine;
	let currentDialogue = this.dialogues[this.dialogueNum];
	if (!(currentDialogue)) {
	  console.log("Completing dialogue now");
	  this.onComplete();
	  return false;
	}
	currentLine = currentDialogue.content[this.dialogueLineIndex];
	if (!currentLine) {
	  this.dialogueNum++;
	  this.dialogueLineIndex = 0;
	  this.append_dialogue();
	  return;
	}
	if (currentLine.noClear !== true) this.dialogueTextEle.textContent = '';
	const speaker = currentDialogue.speaker || this.defaultSpeaker;
		
	if (speaker) {
	  this.speakerNameEle.textContent = speaker.name;
	  if (speaker.portrait) this.eventManager.trigger('renderSpeakerPortrait', {speaker});
	}
					
	TextProcessor.processText(currentLine, this.dialogueTextEle);
	this.append_dialogue_history({text: currentLine.text, speaker});
  }
	
  on_dialogue_complete(callback) {
	this.onComplete = callback;
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
	
  finished_dialogue(end = false, ) {
    this.dialogues = null;
	this.dialogueNum = 0;
	this.defaultSpeaker = null;
	this.onComplete = null;
	this.disableClickAdvance = true;
	TextProcessor.clear();
	if (end) this.eventManager.trigger('hideUI', { uiArray: ['gameUI', 'dialogue', 'dialogue'] });
  }
  initiate_listeners() {
	this.mouseHandler.addListeners("click", 'dialogue-historybtn', 
	  (payload) => this.eventManager.trigger('showUI', {uiArray: ['gameUI', 'dialogue', 'dialogueHistory', 'container']}));
	
	this.mouseHandler.addListeners('click', 'dialogue-history-closebtn',
	  (payload) => this.eventManager.trigger('hideUI', {uiArray: ['gameUI', 'dialogue', 'dialogueHistory', 'container']}));
	this.eventManager.on('renderSpeakerPortrait', (payload) => {
	  this.eventManager.logic.engine.renderManager.render_speaker_portrait(payload);
	});
	this.mouseHandler.addListeners("click", 'dialogue-text', (payload) => {
	  if (this.disableClickAdvance) return;
			
	  if (TextProcessor.isTyping) {
		TextProcessor.finishType(this.dialogueTextEle);
	  } else {
		this.dialogueLineIndex++;
		this.append_dialogue();
	  }
	});
	this.eventManager.on('endDialogue', (payload) => this.end_dialogue());
  }
  
};