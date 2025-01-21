// src/language/LocalizationManager.js

class LocalizationManager {
  constructor(eventManager) {
	this.eventManager = eventManager;
	this.currentLanguage = 'language-chinese-simplified'; //defaults to 简体中文
	this.translations = chineseSimplified;
	this.eventManager.on('translate', (payload) => {
	  const translatedTexts = this.batch_translate(payload.keys);
	  if (payload.cb) payload.cb(translatedTexts);
	});
  }
  
  loadLanguage(languageFile) {
	this.translations = languageFile;
	this.currentLanguage = Object.keys(languageFile)[0];
	console.log(this.currentLanguage);
  }
  
  t(key) {
	return this.translations[key] || key;
  }
  
  batch_translate(keys) {
	const translatedTexts = [];
	if (Array.isArray(keys)) {
	  keys.forEach(key => {
		translatedTexts.push(this.t(key));
	  });
	}
	return translatedTexts;
  }
};