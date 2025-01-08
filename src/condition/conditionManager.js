// src/condition/conditionManager.js


/**
 * @class
 * Centralized for evaluating conditions
 */
class ConditionManager {
  constructor(eventManager) {
	this.eventManager = eventManager;
	this.onComplete;
	this.questConditions = new Map();
	this.scriptConditions = new Map();
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
	  switch(type) {
		case 'selector': // At least one condition must succeed
		  result = this.handle_selector(evaluate.check);
		  if (result && next_node) this.onComplete(next_node);
		  return result;
		case 'sequence': //Stoped at failed condiitons, but will execute actions regardless
		  result = this.handle_sequence(evaluate.check);
		  if (result && next_node) this.onComplete(next_node);
		  return result;					
		case 'parallel': //Execute multiple actions only after passing a threshold of success/fail
		  result = this.handle_parallel(evaluate.check);
		  if (result && next_node) this.onComplete(next_node);
		  return result;
		default:
		  throw new Error('Unknown condition type: ', type);	
	  }
	}	
  }
	
  handle_selector(checks) {
	for (let check of checks) {
	  const action = check.action;
	  const result = this.check(check);
	  if (result) {
		myPromise
		.then(() => {
		  if (action) this.process_action(action);
		})
		.then(() => {
		  if (check.next_node) this.onComplete(next_node);
		});
		return true;
	  }
	}
	return false;
  }
	
  handle_sequence(checks) {
	for (let check of checks) {
	  const result = this.evaluate(check);
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
	  const result = this.check(check);
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
		myPromise.then(() => {
		  actions.forEach(action => {
		    this.process_action(action);
		  });
		})
		.then(() => {
		  if (checks.next_node) this.onComplete(next_node);
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
	
  on_choice_complete(callback) {
	console.log("Registered on complete: ", callback);
	this.onComplete = callback;
  }
  
  process_action(action) {
	console.log("Processing actions!");
  }
  
  init_events() {
	this.eventManager.on('checkConditions', (payload) => {
	  const result = this.check_conditions(payload.conditions);
	  if (result) payload.callback();
	});
  }
};