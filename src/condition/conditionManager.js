// src/condition/conditionManager.js

/**
 * @class
 * Centralized for evaluating conditions
 */
class ConditionManager {
  constructor(eventManager) {
	this.eventManager = eventManager;
	this.questConditions = new Map();
	this.scriptConditions = new Map();
	this.init_events();
  }
  
  parse_conditions(conditions) {
	for (let condition of conditions) {
	  const { evaluate } = condition;
	  if (!evaluate) continue;
	  const checks = evaluate.check;
	  if (!checks) continue;
	  for (let check of checks) {
	    this.subscribe_conditions(check);
		check.check_condition();
	  }
	}
  }
  
  static handlers = {
    selector: 'handle_selector',
	sequence: 'handle_sequence',
	parallel: 'handle_parallel'
  };
  
  subscribe_conditions(check) {
	if (!check) console.error("Empty check: ", check);
	if (check.isDeferred) {
	  check.check_condition();
	  this.eventManager.on(check.eventType, (payload) => {
		check.check_condition(payload);
	  });
	} else {
	  this.eventManager.trigger(check.eventType, check);
	}
  }
	
  check_conditions(conditions) {
	if (!conditions || !Array.isArray(conditions)) {
      throw new Error("Invalid or missing conditions array.");
    }
	for (let condition of conditions) {
	  const { evaluate, next_node } = condition;
	  let result = false;
	  if (!evaluate) throw new Error('Missing evaluate object: ', condition);
	  const type = evaluate.type || 'selector';
	  const currentHandler = ConditionManager.handlers[type];
	  if (!currentHandler) throw new Error("Does not recognize the type of condition check: ", type);
	  result = this[currentHandler](evaluate.check);
	  if (result && next_node) {
		this.eventManager.trigger('runNextNode', {nextNode: next_node});
	    return true;
	  }
	}	
  }
  
  
	
  handle_selector(checks) {
	for (let check of checks) {
	  const action = check.action;
	  const result = check.isMet;
	  if (result) {
		myPromise
		.then(() => {
		  if (action) this.process_action(action);
		});
		return true;
	  }
	}
	return false;
  }
	
  handle_sequence(checks) {
	for (let check of checks) {
	  const result = check.isMet;
	  if (!result) return false;
	  const action = check.action;					
	  if (action) this.process_action(action);
	}
	return true;
  }

  handle_parallel(checks) {
	const successThreshold = checks.success_threshold || 1;
	const failThreshold = checks.fail_threshold || 0;
	let successCount = 0; 
	let failCount = 0;
	const actions = [];
	
	for (let check of checks) {
	  const result = check.isMet;
	  const action = check.action;
	  if (result) {
		actions.push(action);
		successCount++;
	  } else {
		failCount++;
	  }	
	}
	
	if (checks.fail_over_success) {
	  if (failCount > failThreshold) return false;
	} else {
	  if (successCount >= successThreshold) {	
		actions.forEach(action => {
		  this.process_action(action);
		});
		return true;
	  }
	}
  }
  
  add_quest_condition(quest, condition) {
	if (!this.questConditions.has(quest)) {
	  this.questConditions.set(quest, []);	
	}
	this.questConditions.get(quest).push(condition);
  }
  
  process_action(action) {
	console.log("Processing actions!");
  }
  
  init_events() {
	this.eventManager.on('checkConditions', (payload) => {
	  const conditions = payload.conditions;
	  this.parse_conditions(conditions);
	  const result = this.check_conditions(conditions);
	  if (result && payload.callback) payload.callback();
	});
  }
};