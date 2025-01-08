// src/relationship/relationship.js

/**
 * The relationship refers to the character's subjective view of the other party. 
 * This point of view of relationship is not necessarily mutual. 
 * THIS FEATURE EXTENDS TO PLAYER'S RELATIONSHIP TREE, in which what they see in their 
 * character relationship does not reflect the other party's view of player.
 * The character relationship tree is default to be hidden from player unless fulfilling
 * some condiiton.
 * @property {Object} fl (abbrev. for friendliness) determine the tone of talking
 * @property {Object} idf (abbrev. for indifference) determine how likely the character will help out or harm the target
 * @property {Object} it (abbrev. for intent) did not specify the kind of intent on purpose
 * @property {Boolean} hidden
 * @property {Boolean} special
 * @property {Boolean} isNegEx
 * @property {Boolean} isPosEx
 * @property {Array} flRefer
 * @property {Array} idRefer
 * @property {Array} itRefer
 * @property {Object} memory
 */
class Relationship {
  constructor() {
	this.hidden = false;
	this.special = false;
	this.memory = {};
	
	this.fl = {
		minValue: -100, maxValue: 100, value: 0,
		minLevel: -2, maxLevel: 2, level: 0, threshold: 50,
		exNegThresholdLevel: -2, exPosThresholdLevel: 2,			
		isNegEx: false, isPosEx: false,
		refer: '随性'
	};
		
	this.idf = {
		minValue: -100, maxValue: 100, value: 0, threshold: 50,
		minLevel: -2, maxLevel: 2, level: 0,
		exNegThresholdLevel: -2, exPosThresholdLevel: 2,
		isNegEx: false, isPosEx: false,
		refer: '无感'
	};
		
	this.it = {
		minValue: -100, maxValue: 100, value: 0, threshold: 50, 
		minLevel: -2, maxLevel: 2, level: 0,
		exNegThresholdLevel: -2, exPosThresholdLevel: 2,
		isNegEx: false, isPosEx: false,
		refer: '平淡'
	};
	
	this.relationshipLevels = {
		fl: ['厌恶', '不善', '随性', '友善', '亲近'], 	//Revolted, aloof, casual, friendly, intimate
		idf: ['忽视', '疏远', '无感', '关切', '热忱'], 	//Disdain, distant, indifferent, concern, passionate
		it: ['仇恨', '排斥', '平淡', '好奇', '在意'] 	//Animosity, repulsion, disinterested, curious, interested
	};
  }
	
  switch_relationship_level(type) {
	if (!this[type]) throw new Error('Invalid relationship type： ', type);
	const newLevel = Math.floor((this[type].value) / this[type].threshold);
	if (this[type].level !== newLevel) {
		this[type].level = Math.max(this[type].minLevel, Math.min(newLevel, this[type].maxLevel));
		this[type].refer = this.relationshipLevels[type][newLevel + 2];
		if (this[type].level >= this[type].exPosThresholdLevel) this[type].isPosEx = true;
		if (this[type].level <= this[type].exNegThresholdLevel) this[type].isNegEx = true;
		if (this[type].level < this[type].exPosThresholdLevel) this[type].isPosEx = false;
		if (this[type].level > this[type].exNegThresholdLevel) this[type].isNegEx = false;

	}				
  }
	
  decay_relationship(type, decayRate = 1) {
	if (!this[type]) throw new Error('Invalid relationship type： ', type);
	this[type].value = Math.max(this[type].minValue, Math.min(this[type].maxValue, this[type].value - decayValue));
	this.switch_relationship_level(type);
  }
	
  modify_relationship(type, value, weight = 1) {
	if (this[type]) {
		this[type].value = 
			Math.max(this[type].minValue, Math.min(this[type].maxValue, this[type].value + value * weight));
		this.switch_relationship_level(type);
	}
  }
  
  set_relationship_value(type, value) {
	if (this[type] && typeof value === 'number') this[type].value = value;
	this.switch_relationship_level(type);
  }
	
  
	
  is_neg_ex() {
	if (this.fl.isNegEx) return true;
	if (this.idf.isNegEx) return true;
	if (this.it.isNegEx) return true;
	return false;
  }
	
  is_pos_ex() {
	if (this.fl.isPosEx) return true;
	if (this.idf.isPosEx) return true;
	if (this.it.isPosEx) return true;
	return false;
  }
  
  /**
   * 
   * @param characterRelationship
   * @param otherRelationship
   */
  calculate_influence(baseInfluence, context = {}) {
    const extremeFactor = (this.is_neg_ex() || this.is_pos_ex()) ? 1.5 : 1; // Scale by how extreme the relationship is
	const contextFactor = context.multiplier || 1;
	return baseInfluence * extremeFactor * contextFactor;
  }
	
  memorize(flagName, value) {
	this.memory[flagName] = {
		value,
		timestamp: new Date().toISOString()
	};
  }
	
  forget(flagName) {
	if (this.memory[flagName]) {
		delete this.memory[flagName]
	} else {
		console.log("No memory found for name: ", flagName);
	}
  }
  
  get_memory(type) {
	if (this.memory[type]) {
		return this.memory[type];
	} else {
		console.log("Memory type not found! ", type);
	}
  }
  
  get_all_memory() {
	return this.memory;
  }
	
  
};

