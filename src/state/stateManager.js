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
	constructor(engine) {
		this.engine = engine;
		this.activeScripts;
		this.pendingUpdates;
		this.persistData;
		
		this.completedScripts = {
			main_story: [],
			side_stories: []
		};
		this.currentStage;
		this.state = {
			player: {
				
			},
			env: {},
			world: {},
			factions: {},
			companions: {},
			NPCs: {},
			globalFlags: {}
		};
	}
	
	initialize_state() {
		const initialState = {
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
			companions: {},
			NPCs: {},
			env: {
				currentArea: 'testLayer'
			}
		};
		this.scriptManager = this.engine.logic.scriptManager;
		this.state = initialState;
		this.currentStage = 'prologue';
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
	}
	
	update(timestamp) {
		this.check_paused_scripts();
		this.run_active_scripts();
	}
	
	flush_updates() {
		this.batch_updates(this.pendingUpdates);
		this.pendingUpdates = null;
	}
	
	update_state(key, value) {
		
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
	
	run_active_scripts() {
		let reqFocus = false;
		for (let [scriptType, scripts] of Object.entries(this.activeScripts)) {
			for (let [scriptID, content] of Object.entries(scripts)) {
				if (reqFocus && content.require_focus) continue; 
				this.engine.logic.eventManager.trigger('runScript', {
					stage: this.currentStage, 
					scriptType: scriptType, 
					scriptID: scriptID, 
					startingNodeID: content.current_node
				});
				if (content.require_focus && reqFocus !== true) reqFocus = true;
			}
		}
		
	}
	
	start_script(scriptType, scriptID, startingNode = "start") {
		this.activeScripts[scriptType][script_ID].current_node = startingNode;
		this.scriptManager.run(this.currentStage, scriptType, scriptID, startingNode);
	}
	
	update_script_progress(scriptType, scriptID, nodeID) {
		if (this.activeScripts[scriptType][scriptID])
			this.activeScripts[scriptType][scriptID].node_ID = nodeID;
	}
	
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
		}
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
	
};