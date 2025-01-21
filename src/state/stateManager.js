// src/state/stateManager.js

/**
 * @class
 * @property engine
 * @property activeScripts
 * @property pendingUpdates
 * @property persistData
 * @property completedScripts
 * @property initialize_state
 * @property load_state 
 */
class StateManager {
  constructor(eventManager) {
	if (eventManager instanceof EventManager) {
	  this.eventManager = eventManager;
	} else {
	  throw new Error('The event manager passed is not instance of Event Mnanager: ', eventManager);
	}
	this.pendingUpdates;
	this.persistData;
	this.state;
  }

  initialize_state() {
	this.state = {};
	this.pendingUpdates = null;
  }
	
  flush_updates() {
	this.batch_updates(this.pendingUpdates);
	this.pendingUpdates = null;
  }
	
  update_state(key, value) {}
	
  complete_script(scriptType, scriptID) {
	const foundScript = this.activeScripts[scriptType][scriptID];
		
	if (foundScript) {
	  this.completedScripts[scriptType].push(scriptID);
	  delete this.activeScripts[scriptType][scriptID];
	} else {
	  console.warn(`Script type ${scriptType} with id ${scriptID} is not found!`);
	}			
  }
	
  is_script_completed(scriptType, scriptID) {
	return this.completedScripts[scriptType].includes(scriptID);
  }
	
  save_state() {
	return {
	  activeScripts: this.activeScripts,
	  currentStage: this.currentStage,
	  state: this.state,
	  completedScripts: this.completedScripts
	};
  }
	
  set_global_flag(flagName, value) {
	if (typeof flagName !== "string") throw new Error('Global flag name must be a string.');
	this.state.globalFlags[flagName] = value;
  }
	
  set_stage(stageID) {
	if (typeof stageID !== "string") throw new Error("Stage ID must be a string: ", stageID);
		
	this.currentStage = stageID;
  }
	
  get_current_stage() {
	return this.currentStage;
  }
	
  reset_state() {
	this.initialize_state();
  }
	
  load_state(save) {
	Object.assign(this, save);
  }
	
  init_events() {
	this.eventManager.on('startNewGame', (payload) => this.initialize_state());
	this.eventManager.on('collectedItem', (payload) => {
	  const characterInventory = this.state[payload.characterID].inventory;
	  
	  if (payload.addValue) characterInventory[payload.targetID] = 
	    (characterInventory[payload.targetID] || 0) + payload.addValue;
	  if (payload.callback) 
	    payload.callback(characterInventory[payload.targetID]);
	});
	
	this.eventManager.on('relationshipChange', (payload) => {  
	
	});
	
	this.eventManager.on('statChange', (payload) => {
	
	});
	
	this.eventManager.on('completeScript', (payload) => {
	  const { scriptID, scriptType } = payload;
	  const foundScript = this.state.scripts[scriptType][scriptID];
	  this.state.scripts.completed[this.state.stage][scriptType].push({
		id: scriptID,
		timestamp: new Date().toISOString()
	  });
	});
	this.eventManager.on('createCharacter', (payload) => {
	  const { tag, id, state, mode, direction, relaitonships } = payload.character;
	  this.state.characters[tag][id] = {
	    tag: tag,
		id: id,
		state: state,
		mode: mode,
		direction: direction,
		relationships: relationships
	  }		  
	});
  }
	
};