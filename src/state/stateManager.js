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
	this.state = { player: {}, env: {}, world: {}, 
	factions: {}, companions: {}, NPCs: {}, 
	globalFlags: {} };
  }

	
  initialize_state() {
	const initialState = {
	  stage: 'prologue',
	  scripts: {
		active: {
		  main_story: {},
		  side_stories: {}
		},
		paused: {},
		completed: {}
	  },
	  player: {
		name: {
		  lname: '左',
		  fname: '汶'
		},
		mode: 'normal',
		composure: 100,
		intro: `Still familiar with the silhouette in mirror. How fascinating is that?
		镜中人仍熟悉，何等精妙？`,
		stats: null,
		inventory: null,
		traits: null,
		app: null,
		model: null
	  },
	  specials: {},
	  NPCs: {},
	  env: { currentArea: 'testLayer' }
	};
	this.state = initialState;
	this.eventManager = this.engine.logic.eventManager;
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
  }
	
};