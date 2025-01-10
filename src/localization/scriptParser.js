// src/localization/scriptParser.js

class ScriptParser {
  constructor(localizationManager) {
	this.localizationManager = localizationManager;
  }
  
  recursive_parse(current) {
	if (!current) return;
	
	if (!Array.isArray(current)) {
	  for (const key in current) {
		if (!current[key]) {
		  console.log(`Current ${current} with key ${key} is not found or empty`);
		  continue;
		}
		
		if (typeof current[key] === 'string') {
		  //Localization marker takes the format of: t("accessKey")
		  if (current[key].startsWith("t(") && (current[key].endsWith('")'))) {
			const accessKey = current[key].slice(3, -2);
			const replacement = this.localizationManager.t(accessKey);
			if (replacement) current[key] = replacement;
		  }
		} else {
		  this.recursive_parse(current[key]);
		}
	  }
	} 
	
	if (Array.isArray(current)) {
	  for (let i = 0; i < current.length; i++) {
	    this.recursive_parse(current[i]);
	  }
	}
  }
};