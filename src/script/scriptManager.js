// src/scripts/scriptManager.js

/**
 *
 * @class 
 */
class ScriptManager {
  static handlers = {
	dialogue: 'handle_dialogues',
	event: 'handle_events',
	choice: 'handle_choices',
	conditions: 'handle_conditions'
  };
  
  constructor(eventManager, inputHandler) {
	this.eventManager = eventManager;
	this.inputHandler = inputHandler;
	console.log("This is the handler received: ", inputHandler);
	this.eventManager.trigger('initDialogueUI', {});		
	
	this.dialogueManager = new DialogueManager(this.eventManager, this.inputHandler);
	this.conditionManager = new ConditionManager(this.eventManager);
	
	this.currentFocusScript;
	this.currentChunkIndex;
	this.default_speaker;
	this.timeoutTimers = {};
	this.completedScripts = {
	  main_story: [],
	  side_stories: []
	};
	this.activeScripts = {
	  main_story: {
		prologue_tutorial: {  
		  current_node: 'start',
		  require_focus: true
		}
	  },
	  side_stories: {}
	};
	this.pausedScripts = {
	  main_story: {
		//Format should be something like:
		//some_script: { paused_node: nodeID, continue_conditions: condition, require_focus }
	  },
	  side_stories: {}
	};
	this.initiate_listeners();
	this.currentNode;
  }
	
  run(startingNodeID) {
	this.currentChunkIndex = 0;
	this.default_speaker = this.currentFocusScript.default_speaker || null;
	const currentNode = this.currentFocusScript.nodes[startingNodeID];
	console.log("This is the currentNode: ", currentNode);
	if (currentNode) {
	  this.currentNode = currentNode;
	  this.execute_node();
	} else {
	  console.error('Node with id: ', startingNodeID, "not found!");
	}
  }
  
  check_paused_scripts() {
	for (let [scriptType, scripts] of Object.entries(this.pausedScripts)) {
	  for (let [scriptID, content] of Object.entries(scripts)) {
		const result = this.engine.logic.conditionManager.check_condition(content.continue_conditions);
		if (result) {
		  Object.defineProperty(this.activeScripts, scriptID, {
		    current_node: result, 
		    require_focus: content.require_focus});
		  delete this.pausedScripts.scriptType.scriptID;
		}
	  }
	}
  }
  
  start_script(scriptType, scriptID, startingNode = "start") {
	this.activeScripts[scriptType][script_ID].current_node = startingNode;
	this.engine.logic.eventManager.trigger('runScript', {
	  stage: this.currentStage, 
	  scriptType: scriptType, 
	  scriptID: scriptID, 
	  startingNodeID: startingNode
	});
  }
  
  run_active_scripts() {
	let reqFocus = false;
	for (let [scriptType, scripts] of Object.entries(this.activeScripts)) {
	  for (let [scriptID, content] of Object.entries(scripts)) {
		if (reqFocus && content.require_focus) continue; 
		this.eventManager.trigger('runScript', {
		  stage: this.currentStage, 
		  scriptType: scriptType, 
		  scriptID: scriptID, 
		  startingNodeID: content.current_node
		});
		if (content.require_focus && reqFocus !== true) reqFocus = true;
	  }
	}
  }
  
  update_script_progress(scriptType, scriptID, nodeID) {
	if (this.activeScripts[scriptType][scriptID])
	  this.activeScripts[scriptType][scriptID].node_ID = nodeID;
  }
	
  execute_node() {
	if (!this.currentNode) throw new Error('Current node is undefined!');
	
	const pairs = Object.entries(this.currentNode);
	const key = pairs[this.currentChunkIndex][0];
	const value = pairs[this.currentChunkIndex][1];	
	if (!key || !value) 
	{
	  this.eventManager.trigger('reachedEndOfDialogue', {});
	  return;
	}
	const currentHandler = ScriptManager.handlers[key];
	
	if (!currentHandler) throw new Error("Key is not recognized: ", key);
	this[currentHandler](value);
  }
  
  handle_dialogues(value) {
	this.eventManager.trigger('startDialogue', {dialogues: value, defaultSpeaker: this.default_speaker});
  }
	
  handle_choices(choices) {
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
	this.eventManager.trigger('showUI', { uiArray: ['gameUI', 'dialogue', 'choice', 'container'] });

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
		//this.dialogueManager.triggerWaitTooLong(waitTooLong);
	}, choiceTimeout);	
  }
	
  triggerWaitTooLong(waitTooLong) {
	this.curTimeoutIndex;
	const newTimeout = waitToolong
  }
	
  handle_conditions(conditions) {
	this.eventManager.trigger('checkConditions', { conditions: conditions });
  }
	
  initiate_listeners() {
	this.eventManager.on('runScript', (payload) => {
	  const {scriptType, scriptID, startingNodeID} = payload;
	  const foundScript = allScripts.findScript(scriptType, scriptID);
	  if (!foundScript) 
		console.error(`Stage ${stage} scriptType ${scriptType} with id ${scriptID} not found!`);
	  if (this.currentFocusScript !== foundScript) {
		this.currentFocusScript = foundScript;
		console.log("Running script now.");
		this.run(startingNodeID);
	  }
	});
	
	this.eventManager.on('finishedDialogueAppending', (payload) => {
	  console.log("Finished dialogue appending now");
	  this.currentChunkIndex++;
	  this.execute_node();
	  if (payload.callback) payload.callback();
	});
	
	this.eventManager.on('runNextNode', (payload) => {
	  console.log('Running next node: ', payload.nextNode);
	  this.run(payload.nextNode);
	});
	
	
  }
	
  pause_script(scriptID) {
  
  }
	
  complete_script(scriptID) {	
  
  }
};