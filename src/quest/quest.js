// src/quest/quest.js

/**
 * Represents a quest in the game.
 * @class
 * @property {string} type - The quest type (e.g., "main", "side").
 * @property {string} status - The current status of the quest ("available", "active", "completed", "failed", "missed").
 * @property {number} currentObjective - Index of the current objective in the stepsToComplete array.
 * @property {Array<Object>} stepsToComplete - List of objectives with descriptions and completion flags.
 * @property {boolean} repeatable - Whether the quest can be repeated after completion or failure.
 * @property {boolean} missable - Whether the quest can be missed if conditions aren't met.
 * @property {Function|null} failCondition - A function defining conditions that cause quest failure.
 * @property {Function|null} missCondition - A function defining conditions that cause the quest to be missed.
 * @property {Array<Object>} prerequisites - Requirements to make the quest available (e.g., level, prior quests).
 * @property {Array<Object>} rewards - Rewards for completing the quest (e.g., items, experience points).
 * @property {Object} statusTracking - Tracks current progress, time limits, and state flags.
 */
class Quest {
  constructor({ title, type, requestor, repeatable, repeatCondition, prerequisites, rewards, objectives, failCondition, missCondition}) {
	this.type = type;
	this.title = title;
	this.currentObjective;
	this.objective = objectives;
	this.repeatable = repeatable;
	this.repeatCondition = repeatCondition;
	this.failCondition = failCondition;
	this.missCondition = missCondition;
	this.prerequisites = prerequisites;
	this.rewards = rewards;
	this.requestor = requestor;
	this.status;
  }
	
  fulfill_objective() {
	  
  }
  
  change_objective() {
  
  }
	
  missed_quest() {
	if (!this.repeatable) this.status = "missed";
  }
  
  failed_quest() {
	if (!this.repeatable) this.status = "failed";
  }
  
  complete_quest() {
	this.status = 'completed';
  }
  
  fulfilled_prerequisites() {
	this.status = "available";
	if (!this.repeatable) this.prerequisites = null;
  }
  
  complete_quest() {
	if (this.repeatable) {
	  this.status = "available";
	} else {
	  this.status = "completed";
	}
  }
	
};