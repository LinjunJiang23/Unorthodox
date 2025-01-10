// src/condition/condition.js

class Condition {
  constructor({eventType, characterID, targetID, value, operator, type, allowRetry = false, action = null, isDeferred = false}) {
	this.characterID = characterID || null;
	this.value = value || null;
	this.targetID = targetID || null;
	this.operator = operator || null;
	this.eventType = eventType || null;
	this.isMet = false;
	this.type = type || null;
	this.progress;
	this.allowRetry = allowRetry;
	this.action = action;
    this.isDeferred = isDeferred; 
  }
  
  static handlers = {
    collectedItems: 'check_collected',
	relationshipChange: 'check_relationship',
	fallback: 'always_true',
	statChange: 'check_stat',
  };
  
  check_condition(data) {
	const handlerName = Condition.handlers[this.eventType];
	if (handlerName && typeof this[handlerName] === 'function') {
	  if (this.isDeferred) {
	    if (this.progress) {
		  this[handlerName](this.progress);
		} else {
		  this.init_progress();
		}
	  } else {
	    this[handlerName](data); 
	  }
	} else {
	  throw new Error('Unknown condition event type: ', this.eventType);
	}
  }
  
  check_collected(data) {
	const {targetID, characterID, item} = data;
	if (item.id === this.targetID && characterID === this.characterID) {
	  if (item.value >= this.value) {
	    this.isMet = true;
	  } else {
		if (!this.allowRetry) {
		  this.failed = true;
		}
	  }
	} else {
	  console.log(`item id: ${targetID} collected by character ${this.characterID} isn't right value: ${value}`);
	  if (!this.allowRetry) this.failed = true;
	}
  }
  
  check_relationship(data) {
	if(!data) {
	  console.log("no data passed here yet");
	  return;
	}
	if (data.characters.characterID === this.characterID) {
	  const relationships = data.characters.characterID.relationships;
	  if (relationships[targetID] && relationships[targetID].type) {
		const result = checkWithOperator(relationships[targetId].type, value, operator);
		if (result) {
		  this.isMet = true;
		} else {
		  this.isMet = false;
		  if (!this.allowRetry) this.failed = true;
		}
	  }
	}
  }
  check_stat(data) {
  
  }
  
  always_true(data) {
	this.isMet = true;
  }
  
  init_progress() {
	switch(this.eventType) {
	  case 'collectedItems':
		value = this.progress.item.value;
		this.progress = {
		  characterID: this.characterID,
		  item: {
			id: this.targetID,
			value: 0
		  }
		};
		break;
	  case 'relationshipChange': 
	    this.progress = {
		  targetID: this.targetID,
		  characterID: this.characterID,
		  type: this.type,
		  value: 0,
		  operator: this.operator
		};
		break;
	}
  }
  
  update_progress(data) {
	if (!data) console.error("No data passed to update progress");	
	let currentValue;
	switch(this.eventType) {
	  case 'collectedItems':
		currentValue = this.progress.item.value;
		if (data.targetID === this.progress.item.id && data.characterID === this.progress.characterID) {
		  currentValue += data.item.value;
		}
		break;
	  case 'relationshipChange': 
		break;
	}
  }
  
};