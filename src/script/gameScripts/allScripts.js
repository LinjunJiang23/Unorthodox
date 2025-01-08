const allScripts = {
	prologue: {
		main_story: [
			prologue_tutorial
		],
		side_stories: [],
		interactions: [
		],
		special: [],
	},
	
	common: {
		side_stories: [],
		interactions: [
		],
		special: []
	},
	
	findScript(stage, scriptType, scriptID) {
		const cur = this[stage][scriptType].find(script => script.script_ID === scriptID);
		return cur;
	},
	
	removeScript(stage, scriptType, scriptID) {
		this[stage][scriptType] = this[stage][scriptType].filter(script => script.script_ID !== scriptID);
	},
};
