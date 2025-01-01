// src/dialogue/dialogueManager.js

/**
 * @class
 * Handles dialogue presentation, user interaction, manages dialogue-related tasks such as:
 * displaying text, handling player choices, progressing through dialogue trees
 * Also receives instructions from the script manager 
 */
class DialogueManager {
	constructor(logic, eventManager) {
		this.logic = logic;
		this.eventManager = eventManager;
		this.currentDialogueHistory = [];
		this.dialogues;
		this.defaultSpeaker;
		this.dialogueNum = 0;
		this.dialogueLineIndex = 0;
		this.onComplete;
		
		const ele = this.logic.engine.ui.get_UI('gameUI', 'dialogue', 'container');
		this.eventManager.on('renderSpeakerPortrait', (payload) => {
			this.logic.engine.renderManager.render_speaker_portrait(payload);
		});
		this.logic.engine.inputHandler.mouseHandler.addListeners("click", ele, 
			() => {
				if (TextProcessor.isTyping) {
					TextProcessor.finishType(ele);
				} else {
					TextProcessor.clearTexts(ele);
					this.dialogueLineIndex++;
					this.appendDialogues();
				}
		});
	}
	
	start_dialogues(dialogues, defaultSpeaker) {
		this.dialogues = dialogues;
		this.defaultSpeaker = defaultSpeaker;
		this.dialogueNum = 0;
		this.dialogueLineIndex = 0;
		this.append_dialogues();
	}
	
	append_Dialogues() {
		if (this.dialogues[this.dialogueNum].content[this.dialogueLineIndex] === null) {
			this.dialogueNum++;
			this.dialogueLineIndex = 0;
		}
		
		if (this.dialogues[this.dialogueNum] === null) {
			this.on_dialogue_complete() {
			}
		}
		
		let speaker = this.defaultSpeaker;
		const speakerNameEle = 
			this.logic.engine.ui.get_UI('gameUI', 'dialogue', 'speakerDisplay');
		const dialogueTextEle = this.logic.engine.ui.get_UI('gameUI', 'dialogue', 'dialogueText');
		if (this.dialogues[this.dialogueNum].speaker) {
			speaker = this.dialogues[this.dialogueNum].speaker;
			speakerNameEle.textContent = speaker.name;
			if (speaker.portrait) this.eventManager.trigger('renderSpeakerPortrait', {speaker});
		}
		
		TextProcessor.processText(this.dialogues[this.dialogueNum].content[this.dialogueLineIndex], 
		    dialogueTextEle);
	}
	
	on_dialogue_complete(callback) {
		this.onComplete = callback;
	}
};