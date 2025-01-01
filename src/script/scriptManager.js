// src/scripts/scriptManager.js

class ScriptManager {
	constructor(eventManager) {
		this.eventManager = eventManager;
		if (!this.eventManager || typeof this.eventManager.on !== 'function') {
			throw new Error('ScriptManager: Invalid eventManager.');
		}
		
		this.dialogueManager = new DialogueManager(this.eventManager);
		this.currentChunkIndex = 0;
		this.default_speaker;
		
		this.eventManager.on('interactWithNPC', (payload) => {
			// Add logic to determine which script to run for the NPC
			// this.run_script(payload.npc, payload.initiator);
			//this.run_script(payload.npc, payload.initiator);
		});
		this.eventManager.on('showDialogue', (payload) => {
			const { dialogue = [], defaultSpeaker = this.default_speaker } = payload;
			if (dialogue.length === 0) {
			  console.warn('No dialogues provided for showDialogue event.');
			return;
			}
			
			this.eventManager.logic.engine.ui.show_UI('gameUI', 'dialogue', 'container');
			this.dialogueManager.start_dialogues(dialogues, defaultSpeaker);
		});
		
		this.eventManager.on('hideDialogue', (payload) => {
			this.eventManager.logic.engine.ui.hide_UI('gameUI', 'dialogue', 'container');
		});
	}
	
	run(category, scriptId) {
		this.currentScript = allScripts['category'].filter(curScript => curScript.id === scriptId);
		this.default_speaker = this.currentScript.default_speaker;
		
		this.executeNode(this.currentScript.nodes['start']);
	}
	
	execute_node(node) {
		if (node[this.currentChunkIndex] === null)
			this.eventManager.trigger('hideDialogue', '');
		
		const pairs = Object.entries(node);
		const key = pairs[this.currentChunkIndex][0];
		const value = pairs[this.currentChunkIndex][1];
		
		switch(key) {
			case 'dialogue':
				this.eventManager.trigger('showDialogue', { dialogue: value, 
				defaultSpeaker: this.default_speaker });
					this.dialogueManager.onDialogueComplete(() => {
					this.currentChunkIndex++;
					this.execute_node(node);
				});
				break;
			case 'event':
				value.forEach(event => this.eventManager.trigger(event.name, event.payload));
				break;
			case 'choice': 
				this.handle_choice(value);
				break;
		}
	}
	
	handle_choice(choices) {
		if (choices) {
			choices.forEach(choice => {
				
			});
		}
	}
};