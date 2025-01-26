// src/relationship/relationshipManager.js

/**
 * Manage character's group of relationships. 
 * @property relationships
 * @property exRelationships
 * @property add_relationship
 * @property remove_relationship
 * @property has_relationship_with
 * @property find_relationship_with
 */
class RelationshipManager {
  constructor() {
	this.relations = {
	//Takes the format of :
	// tag/id of a character/item: {
	//  type: item/character,
	//  relationship: new Relationship
	//}
	};
	this.exRelations = {};
	// this.eventManager.on('conditionCheckRelationship', (payload) => {
	// this.
	// attribute: condition.attribute,
	// operator: condition.operator,
	// value: condition.value,
	// result: result
	// });
  }
	
  add_relation(target, relationship) {
	if (!(relationship instanceof Relationship)) 
	  throw new Error('Relationship is not in right format: ', relationship); 
	
	const posExResult = relationship.is_pos_ex();
	const negExResult = relationship.is_neg_ex();

	if (posExResult || negExResult) {
	  this.exRelations[tag] = {
		type: type, 
		relationship: relationship, 
		isPos: posExResult, 
		isNeg: negExResult
	  };
	} else {
	  this.relations[tag] = { 
		type: type, 
		relationship: relationship
	  };
	}
  }
	
  remove_relation_with(target) {
	if (!this.has_relation_with(target)) return;
	if (this.relations[tag]) delete this.relations[tag];
	if (this.exRelations[tag]) delete this.exRelations[tag];
  }
	
  has_relation_with(target) {
	if ((!this.relations[tag]) && (!this.exRelations[tag])) return false; 
	return true;
  }
	
  find_relation_with(target) {
	if (!this.has_relation_with(target)) return false;
	if (this.relations[tag]) {
	  if (this.relations[tag].type === type) return this.relations[tag];
	}
	if (this.exRelations[tag]) {
	  if (this.exRelations[tag].type === type) 
		return this.exRelations[tag];
	}
  }
};