// src/relationship/relationshipManager.js

class RelationshipManager {
	constructor() {
		this.relationships = {
			//Takes the format of :
			// tag/id of a character/item: {
			//  type: item/character,
			//  relationship: new Relationship
			//}
		};
		
		this.extremeNegativeRelationships = {};
		this.extremePositiveRelationships = {};
	}
	
	add_relationship(target, relationship) {
		let type;
		if (target instanceof Item) {
			type = 'item';
		} else if (target instanceof BaseCharacter) {
			type = 'character';
		} else {
			throw new Error("The target of this relationship is neither an item nor a character");
		}
		if (!(relationship instanceof Relationship)) throw new Error('Relationship is not in right format: ', relationship); 
		if (!target.tag) throw new Error('Target doesn not have a tag: ', target);
		
		const relationshipStatMap = {
			fl: relationship.fl.level,
			idf: relationship.idf.level,
			it: relationship.it.level
		};
		
		if (relationship.fl.level >= Math.abs(relationship.extremeThresholdLevel)) 
		
		this.relationships[target.tag].type = type;
		this.relationships[target.tag].relationship = relationship;
	}
	
	adjust_relationships(interaction) {
		
	}
};