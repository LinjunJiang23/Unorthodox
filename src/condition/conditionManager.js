// src/condition/conditionManager.js


/**
 * @class
 * Centralized for evaluating conditions
 */
class ConditionManager {
	constructor(eventManager) {
		this.eventManager = eventManager;
		this.onComplete;
	}
	
	parse_conditions(evalObject) {
		if (!evalObject) return;
		
		const type = evalObject.type || 'selector';
		const conditions = evalObject.conditions;
		const action = evalObject.action;
		const result = this.check_condition(type, conditions);
		
		if (result === true) {
			if (action) this.process_action(action);
			if (evalObject.next_node) this.onComplete(evalObject.next_node);
		}
	}
	
	check_condition(type, conditions) {
		if (!conditions) return;
		
		switch(type) {
			case 'selector': // At least one condition must succeed
				conditions.forEach(condition => {
					const action = condition.action;
					const result = this.evaluate(condition);
					const nextNode = condition.next_node;
					if (result) {
						myPromise
						.then(() => this.process_action(action))
						.then(() => {
							if (this.nextNode) this.onComplete(nextNode);
						});
						return true;
					}
				});
				return false;
				break;
				
			case 'sequence':
				conditions.forEach(condition => {
					const result = this.evaluate(condition);
					if (!result) return false;
					const action = condition.action;					
					this.process_action(action);
				});
				let nextNode = conditions[conditions.length - 1].next_node;
				if (nextNode) this.onComplete(nextNode);
				return true;
				break;
				
			case 'parallel':
				nextNode = condition.next_node;
				const successThreshold = condition.success_threshold || 1;
				const failThreshold = condition.fail_threshold || 0;
				let successCount = 0;
				let failCount = 0;
				const actions = [];
				conditions.forEach(condition => {
					const result = this.evaluate(condition);
					const action = condition.action;
					if (result) {
						actions.push(action);
						successCount++;
					} else {
						failCount++;
					}	
				});
				if (condition.fail_over_success) {
					if (failCount > failThreshold)
						return false;
				} else {
					if (successCount >= successThreshold) {
						myPromise.then(() => this.actions.forEach(action => {
							this.process_action(action);
						}))
						.then(() => {
							if (nextNode) this.onComplete(nextNode);
						});
						return true;
					}
				}
				return false;
				break;
			default:
				throw new Error('Unknown condition type: ', type);	
		}
	}
	
	evaluate(condition) {
		const result = [];
		const value = condition.value;
		switch (condition.type) {
			case 'stat':
				this.eventManager.trigger('conditionCheckStat', {
					attribute: condition.attribute,
					operator: condition.operator,
					value: condition.value,
					result: result
				});
				return result[0];
				break;
			case 'relationship':
				this.eventManager.trigger('conditionCheckRelationship', {
					attribute: condition.attribute,
					operator: condition.operator,
					value: condition.value,
					result: result
				});
				break;
			case 'true':
				return true;
				break;
			case 'hasItem':
				break;
			default:
				return false;
		}
	}
	
	return_result(result) {
	}
	
	process_action(action) {
	}
	
	on_choice_complete(callback) {
		this.onComplete = callback;
	}
	
};