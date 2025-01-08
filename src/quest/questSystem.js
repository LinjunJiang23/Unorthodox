// src/quest/questSystem.js


class QuestSystem {
  constructor(eventManager) {
	this.eventManager = eventManager;
	this.allQuests = new Set();
  }
  
  parse_quests(quests) {
	for (let quest of quests) {
	  this.allQuests.add(this.construct_quest(quest));
    }
  }
  
  construct_quest(quest) {
	if (!(quest.objectives)) throw new Error("Empty quest without objectives: ", quest);
	  const curquest = {
		title: quest.title || '?',
		type: quest.type || 'side',
		requestor: quest.requestor || null,
		repeatable: quest.repeatable || false,
		prerequisites: quest.prerequisites || null,
		repeatCondition: quest.repeat_condition || null,
		failCondition: quest.fail_condition || null,
		missCondition: quest.miss_condition || null,
		rewards: quest.rewards || null,
		objectives: quest.objectives
	};
	return new Quest(curquest);
  }
  
  check_available_quests() {
	for (let quest of this.allQuests) {
	  if (!(quest.prerequisites && quest.prerequisites.conditions)) {
	    this.make_quest_available(quest);
		continue;
	  }
	  const conditions = quest.prerequisites.conditions;
	  this.eventManager.trigger('checkConditions', {
		conditions: conditions,
		callback: () => {
		  this.make_quest_active(quest);
		}
	  });
	}
  }
  
  make_quest_active(quest) {
	quest.fulfilled_prerequisites();
	this.eventManager.logic.questManager.add_active_quest(quest);
	this.allQuests.delete(quest);
  }
  
  
};