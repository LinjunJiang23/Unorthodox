// src/language/LocalizationManager.js

class LocalizationManager {
  constructor(eventManager) {
	this.eventManager = eventManager;
	this.currentLanguage = 'language-chinese-simplified'; //defaults to 简体中文
	this.translations = chineseSimplified;
	this.eventManager.on('translate', (payload) => {
	  const translatedText = this.t(payload.key);
	  if (payload.cb) payload.cb(translatedText);
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
};