// src/quest/questManager.js

class QuestManager {
  constructor(eventManager) {
	this.eventManager = eventManager;
	this.activeQuests = new Set();
	this.questLog;
  }
  
  add_active_quest(quest) {
	if (activeQuests.has(quest)) throw new Error('This quest is already an active quest! ', quest);
	this.activeQuests.add(quest);
	this.subscribe_quest(quest);
  }
  
  append_quest_log() {
    
  }
  
  subscribe_quest(quest) {
	quest.objectives.forEach(obj => {
	  this.eventManager.on(obj.eventType, data => {
		obj.check_condition(data);
	  });
	});
  }
  
};