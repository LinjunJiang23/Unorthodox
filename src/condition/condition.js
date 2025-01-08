// src/condition/condition.js

class Condition {
  constructor({eventType, characterID, targetID, value, operator, type}) {
	this.characterID = characterID || null;
	this.value = value || null;
	this.target = target || null;
	this.operator = operator || null;
	this.eventType = eventType || null;
	this.isMet = false;
	this.type = type || null;
	this.progress = 0;
  }
  
  check_condition(data) {
	switch(this.eventType) {
	  case 'collectedItems':
	    this.check_collect_condition(data);
		break;
	  case 'relationshipChange':
	    this.check_relationship_condition(data);
		break;
	}
  }
  
  check_collect_condition(data) {
	if (data.item.id === this.targetID && data.characterID === this.characterID) {
	  if (data.item.value + this.progress >= this.value) {
	    this.isMet = true;
	  } else {
		this.progress += data.item.value;
	  }
  }
  
  check_relationship_condition(data) {
	if (data.characters.characterID === this.characterID) {
	  const relationships = data.characters.characterID.relationships;
	  if (relationships[targetID] && relationships[targetID].type) {
		this.isMet = checkWithOperator(relationships[targetId].type, value, operator);
	  }
	}		
  }
  
};