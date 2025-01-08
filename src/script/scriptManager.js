// src/scripts/scriptManager.js

class ScriptManager {
	constructor(eventManager) {
		this.eventManager = eventManager;
		if (!this.eventManager || typeof this.eventManager.on !== 'function') {
			throw new Error('ScriptManager: Invalid eventManager.');
		}
		
		this.dialogueManager = new DialogueManager(this.eventManager);
		this.conditionManager = new ConditionManager(this.eventManager);
		this.currentScript;
		this.default_speaker;
		this.timeoutTimers = {};
		this.eventManager.logic.engine.ui.uiElements.lazyloadDialogueContainer();		
		this.dialogueManager.initiate_listeners();
		this.initiate_listeners();
	}
	
	run(startingNodeID) {
		this.currentChunkIndex = 0;
		this.default_speaker = this.currentScript.default_speaker;
		const currentNode = this.currentScript.nodes[startingNodeID];
		if (currentNode) {
			this.execute_node(currentNode);
		} else {
			console.error('Node with id: ', startingNodeID, "not found!");
		}
	}
	
  execute_node(node) {
	if (!node) {
	  console.log("Hiiding ui.");
	  this.eventManager.trigger('hideUI', { uiArray: ['gameUI', 'dialogue', 'dialogue'] });
	}	
	const pairs = Object.entries(node);
	const key = pairs[this.currentChunkIndex][0];
	const value = pairs[this.currentChunkIndex][1];
		
	switch(key) {
	  case 'dialogue':
		this.eventManager.trigger('showUI', {uiArray: ['gameUI', 'dialogue', 'dialogue'] });
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
	  case 'conditions':
		this.handle_condition(value);
		break;
	}
  }
	
  handle_choice(choices) {
	myPromise
	.then(() => this.eventManager.trigger('showUI', { uiArray: ['gameUI', 'dialogue', 'choice', 'container'] }))
	.then(() => {
	  const options = choices.options;
	  if (options) this.eventManager.trigger('updateUI', { uiArray: ['gameUI', 'dialogue', 'choice', 'container'], cb: (current) => {
		options.forEach(opt => {
		  const button = document.createElement('button');
		  button.className = 'dialogue-choice-button';
		  button.textContent = opt.text;
			
		  button.onclick = () => {
		    this.handle_choice_selection(opt);
	      };
		  current.appendChild(button);
	    });
	  }});
	});	
	if (choices.waitTooLong) {
	  this.curTimeoutIndex = 0;
	  this._choice_timeout(choices.waitTooLong);			
	}
  }
	
  handle_choice_selection(choice) {
	clearTimeout(this.timeoutTimer);
	if (choice.next_node) {
	  this.eventManager.trigger('hideUI', { uiArray: ['gameUI', 'dialogue', 'choice', 'container'] });	
	  this.run(choice.next_node);
	  this.dialogueManager.disableClickAdvance = false;
	  this.eventManager.trigger('updateUI', { uiArray: ['gameUI', 'dialogue', 'choice', 'container'], cb: (current) => {
		while (current.firstChild) {
		  current.removeChild(current.firstChild);
	    }
	  }});
	  
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
	this.curTimeoutIndex;
	const newTimeout = waitToolong
  }
	
  handle_condition(conditions) {
	this.conditionManager.on_choice_complete((node) => this.run(node));
	this.conditionManager.check_conditions(conditions);
  }
	
  initiate_listeners() {
	this.eventManager.on('runScript', (payload) => {
	  const {stage, scriptType, scriptID, startingNodeID} = payload;
	  const foundScript = allScripts.findScript(stage, scriptType, scriptID);
	  if (!foundScript) 
		console.error(`Stage ${stage} scriptType ${scriptType} with id ${scriptID} not found!`);
	  if (this.currentScript !== foundScript) {
		this.currentScript = foundScript;
		console.log("Running script now.");
		this.run(startingNodeID);
	  }
	});
  }
	
  pause_script(scriptID) {
  }
	
  complete_script(scriptID) {	
  }
};