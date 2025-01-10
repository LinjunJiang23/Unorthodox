class AllScripts {
  constructor(eventManager) {
	this.eventManager = eventManager;
	this.scripts = {
	  stages: {
		prologue: {
		  main_story: [
			prologue_tutorial
		  ],
		  side_stories: [],
		  interactions: [
		  ],
		  special: [],
		},
	  },
	  common: {
		side_stories: [],
		interactions: [
		],
		special: []
	  }
	};
  }
	
  find_script(category, stage, scriptType, scriptID) {
	const cur = this[category][stage][scriptType].find(script => script.script_ID === scriptID);
	return cur;
  }
	
  remove_script(category, stage, scriptType, scriptID) {
	this[category][stage][scriptType] = this[stage][scriptType].filter(script => script.script_ID !== scriptID);
  }
  
  add_script(category, stage, scriptType, script) {
	this[category][stage][scriptType].push(script);
  }
};
