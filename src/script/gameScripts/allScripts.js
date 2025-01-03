const allScripts = {
	prologue: {
		main_story: [
			prologue_tutorial
		],
		side_stories: []
	},
	
	findScript(stage, scriptType, scriptID) {
		const cur = this[stage][scriptType].find(script => script.script_ID === scriptID);
		return cur;
	}
};
