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
		this.disableClickAdvance = false;
		
	}
	
	start_dialogue(dialogues, defaultSpeaker) {
		this.speakerNameEle = 
		  this.eventManager.logic.engine.ui.get_UI('gameUI', 'dialogue', 'speakerDisplay');
		this.dialogueTextEle = 
		  this.eventManager.logic.engine.ui.get_UI('gameUI', 'dialogue', 'dialogueText');
		this.dialogues = dialogues;
		this.defaultSpeaker = defaultSpeaker;
		this.dialogueNum = 0;
		this.dialogueLineIndex = 0;
		this.append_dialogue();
	}
	
	append_dialogue() {
		const currentDialogue = this.dialogues[this.dialogueNum];
		const currentLine = currentDialogue.content[this.dialogueLineIndex];
		

		if (!currentLine) {
			this.dialogueNum++;
			this.dialogueLineIndex = 0;
		
			if (this.dialogues[this.dialogueNum] === undefined) {
			  this.onComplete();
			  return;
			}
		}
		if (!currentLine.noClear) this.dialogueTextEle.textContent = '';

		const speaker = currentDialogue.speaker || this.defaultSpeaker;
		
		if (speaker) {
			this.speakerNameEle.textContent = speaker.name;
			if (speaker.portrait) this.eventManager.trigger('renderSpeakerPortrait', {speaker});
		}
		
			
		TextProcessor.processText(currentLine, this.dialogueTextEle);
		this.append_dialogue_history({text: currentLine.text, speaker});
		this.dialogueLineIndex++;
	}
	
	on_dialogue_complete(callback) {
		this.onComplete = callback;
	}
	
	append_dialogue_history(historyObject) {
		const ele = this.eventManager.logic.engine.ui.get_UI('gameUI', 'dialogue', 'dialogueHistory', 'historyLog');
		
		if (historyObject.speaker) {
			const sp = document.createElement('span');
			sp.className = "dialogue-history-speaker";
			sp.textContent = historyObject.speaker.name;
			ele.appendChild(sp);
		}

		if (historyObject.text) {
			const tx = document.createElement('span');
			tx.className = 'dialogue-history-text';
			tx.textContent = historyObject.text;
			ele.appendChild(tx);
		}
		
		if (historyObject.choice) {
			const ch = document.createElement('span');
			ch.className = 'dialogue-history-choice';
			ch.textContent = historyObject.choice;
			ele.appendChild(ch);
		}	
	}
	
	clear_dialogue_history() {
		const historyLog = this.eventManager.logic.engine.ui.get_UI('gameUI', 'dialogue', 'historyLog');
		while (historyLog.firstChild) {
			historyLog.removeChild(historyLog.firstChild);
		}
	}
	
	initiate_listeners() {
		this.eventManager.logic.engine.inputHandler.mouseHandler.addListeners("click", 'dialogue-historybtn', 
			(payload) => this.eventManager.logic.engine.ui.show_UI('gameUI', 'dialogue', 'dialogueHistory', 'container'));
		
		this.eventManager.logic.engine.inputHandler.mouseHandler.addListeners('click', 'dialogue-history-closebtn',
			(payload) => this.eventManager.logic.engine.ui.hide_UI('gameUI', 'dialogue', 'dialogueHistory', 'container'));
		this.eventManager.on('renderSpeakerPortrait', (payload) => {
			this.eventManager.logic.engine.renderManager.render_speaker_portrait(payload);
		});
		this.eventManager.logic.engine.inputHandler.mouseHandler.addListeners("click", 'dialogue-text', 
			(payload) => {
				if (this.disableClickAdvance) return;
				
				if (TextProcessor.isTyping) {
					TextProcessor.finishType(this.dialogueTextEle);
				} else {
					this.dialogueLineIndex++;
					this.append_dialogue();
				}
		});
	}
};