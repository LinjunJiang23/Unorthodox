// src/relationship/relationship.js


/**
 *  Basic structure for character's relationship system.
 * @property {Object} fl (abbrev. for friendliness) determine the tone of talking
 * @property {Object} idf (abbrev. for indifference) determine how likely the character will help out or harm the target
 * @property {Object} it (abbrev. for intent) did not specify the kind of intent on purpose
 */
class Relationship {
	constructor() {
		this.fl = {
			minValue: -100, maxValue: 100, value: 0,
			minLevel: -2, maxLevel: 2, level: 0, threshold: 50,
			exNegThresholdLevel: -2, exPosThresholdLevel: 2			
			refer: '随性'
		}; //Friendliness
		
		this.idf = {
			minValue: -100, maxValue: 100, value: 0, threshold: 50,
			minLevel: -2, maxLevel: 2, level: 0,
			exNegThresholdLevel: -2, exPosThresholdLevel: 2
			refer: '无感'
		}; //Indifference
		
		this.it = {
			minValue: -100, maxValue: 100, value: 0, threshold = 50, 
			minLevel: -2, maxLevel: 2, level: 0,
			exNegThresholdLevel: -2, exPosThresholdLevel: 2
			refer: '平淡'
		}; //Intent
		this.veiled = false;
		//Revolted, aloof, casual, friendly, intimate
		this.flRefer = ['厌恶', '不善', '随性', "友善", '亲近'];
		//Disdain, distant, indifferent, concern, passionate
		this.idfRefer = ['忽视', '疏远', '无感', '关切', "热忱"];
		//Animosity, repulsion, disinterested, curious, interested
		this.itRefer = ['仇恨' , '排斥' , '平淡', '好奇', "在意"];
		this.special = false;
		this.memory = {};
	}
	
	switch_relationship_level(type) {
		if (!this[type]) throw new Error('Invalid relationship type： ', type);
		const newLevel = Math.floor((this[type].value) / this.threshold);
		if (this[type].level !== newLevel) {
			this[type].level = Math.max(this[type].minLevel, Math.min(newLevel, this[type].maxLevel));
			const obj = Object.keys({type})[0];
			const key = `${obj}Refer`;
			this[type].refer = this[key][newLevel + 2];
		}				
	}
	
	decay_relationship(type, ecayRate = 1) {
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
	
	memorize(flagName, value) {
		this.memory[flagName] = {
			value,
			timestamp: new Date().toISOString()
		};
	}
	
	forget(flagName) {
		delete this.memory[flagName];
	}
	
	set_relationship_value(type, value) {
		if (this[type] && typeof value === 'number') this[type].value = value;
	}
	
	get_memory(type) {
		if (this.memory[type]) return this.memory[type];
	}
};