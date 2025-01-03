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
		this.initiate_listeners();
		this.eventManager.logic.engine.ui.uiElements.lazyloadDialogueContainer();		
		this.dialogueManager.initiate_listeners();
		
		this.timeoutTimers = {};
	}
	
	
	
	run(stage, scriptType, scriptID, startingNodeID) {
		this.currentScript = allScripts.findScript(stage, scriptType, scriptID);
		if (!this.currentScript) 
			console.error(`Stage ${stage} scriptType ${scriptType} with id ${scriptID} not found!`);
		this.default_speaker = this.currentScript.default_speaker;
		if (this.currentScript.nodes[startingNodeID]) {
			this.execute_node(this.currentScript.nodes[startingNodeID]);
		} else {
			console.error('Node with id: ', startingNodeID, "not found!");
		}
	}
	
	execute_node(node) {
		if (node[this.currentChunkIndex] === null)
			this.eventManager.logic.engine.ui.hide_UI('gameUI', 'dialogue', 'dialogue');
		
		const pairs = Object.entries(node);
		const key = pairs[this.currentChunkIndex][0];
		const value = pairs[this.currentChunkIndex][1];
		
		switch(key) {
			case 'dialogue':
				this.eventManager.logic.engine.ui.show_UI('gameUI', 'dialogue', 'dialogue');
				this.dialogueManager.start_dialogue(value, this.default_speaker);
				this.dialogueManager.on_dialogue_complete(() => {
					this.currentChunkIndex++;
					this.execute_node(node);
				});
				break;
			case 'event':
				value.forEach(event => 
					this.eventManager.trigger(event.name, event.payload));
				break;
			case 'choice': 
				this.handle_choice(value);
				this.dialogueManager.disableClickAdvance = true;
				break;
		}
	}
	
	handle_choice(choices) {
		this.eventManager.logic.engine.ui.show_UI('gameUI', 'dialogue', 'choice', 'container');
		const choiceContainer = this.eventManager.logic.engine.ui.get_UI('gameUI', 'dialogue', 'choice', 'container');
		const options = choices.options;
		if (options) {
			options.forEach(opt => {
				const button = document.createElement('button');
				button.className = 'dialogue-choice-button';
				button.textContent = opt.text;
				
				button.onclick = () => {
				this.handle_choice_selection(opt);
				};
				choiceContainer.appendChild(button);
			});
		}
		
		if (choices.waitTooLong) {
			this.curTimeoutIndex = 0;
			this._choice_timeout(choices.waitTooLong);			
		}
	}
	
	handle_choice_selection(choice) {
		clearTimeout(this.timeoutTimer);
		if (choice.next_node) {
			
		}
	}
	
	track_choice_timeout(waitTooLong, time) {
		const choiceTimeout = waitTooLong[this.curTimeoutIndex];
		//May make this timeout timer into an array later on...
		this.timeoutTimer = setTimeout(() => {
			this.dialogueManager.triggerWaitTooLong(waitTooLong);
		}, choiceTimeout);	
	}
	
	triggerWaitTooLong(waitTooLong) {
		this.curTimeoutIndex
		const newTimeout = waitToolong
	}
	
	
	initiate_listeners() {
		this.eventManager.on('interactWithNPC', (payload) => {
			// Add logic to determine which script to run for the NPC
			// this.run_script(payload.npc, payload.initiator);
			//this.run_script(payload.npc, payload.initiator);
		});
	}
	
	pause_script(scriptID) {
	}
	
	complete_script(scriptID) {
		
	}
};