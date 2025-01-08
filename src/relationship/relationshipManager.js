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
		this.relationships = {
			//Takes the format of :
			// tag/id of a character/item: {
			//  type: item/character,
			//  relationship: new Relationship
			//}
		};
		this.exRelationships = {};
		// this.eventManager.on('conditionCheckRelationship', (payload) => {
			// this.
					// attribute: condition.attribute,
					// operator: condition.operator,
					// value: condition.value,
			// result: result
		// });
	}
	
	/**
	 * 
	 * @param target
	 * @param relationship
	 */
	add_relationship(target, relationship) {
		const { tag, type } = relationshipProofTagAndType(target);
		if (!(relationship instanceof Relationship)) 
			throw new Error('Relationship is not in right format: ', relationship); 
		
		const posExResult = relationship.is_pos_ex();
		const negExResult = relationship.is_neg_ex();

		if (posExResult || negExResult) {
			this.exRelationships[tag] = {
				type: type, 
				relationship: relationship, 
				isPos: posExResult, 
				isNeg: negExResult
			};
		} else {
			this.relationships[tag] = { 
				type: type, 
				relationship: relationship
			};
		}
	}
	
	/**
	 *
	 * @param {Object} target
	 */
	remove_relationship(target) {
		const { tag, type } = relationshipProofTagAndType(target);
		if (!this.has_relationship_with(target)) return;
		if (this.relationships[tag]) delete this.relationships[tag];
		if (this.exRelationships[tag]) delete this.exRelationships[tag];
	}
	
	/**
	 *
	 * @param {Object} target
	 */
	has_relationship_with(target) {
		const { tag, type } = relationshipProofTagAndType(target);
		if ((!this.relationships[tag]) && (!this.exRelationships[tag])) return false; 
		return true;
	}
	
	/**
	 *
	 * @param {Object} target
	 */
	find_relationship_with(target) {
		const { tag, type } = relationshipProofTagAndType(target);
		if (!this.has_relationship_with(target)) return false;
		if (this.relationships[tag]) {
			if (this.relationships[tag].type === type) return this.relationships[tag];
		}
		if (this.exRelationships[tag]) {
			if (this.exRelationships[tag].type === type) 
				return this.exRelationships[tag];
		}
	}
};