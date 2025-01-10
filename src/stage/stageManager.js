// src/stage/stageManager.js


class StageManager {
  constructor(eventManager) {
	this.eventManager = eventManager;
	this.currentStage = 'prologue';
	this.stages = [
	  {
		id: 'prologue', 
		init_condiitons: {
		  eventType: 'startGame'
		},
		nextStage: null
	  }
	];
  }
  
  transitToNextStage() {
	this.currentStage = this.stages.find(stage => stage.id === this.currentStage.nextStage);
	this.notify_systems();
  }
  
  notify_systems() {
    
  }
};