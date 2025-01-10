// src/language/LocalizationManager.js

class LocalizationManager {
  constructor() {
    this.currentLanguage = 'chinese-simplified';
	this.translations = chineseSimplified;
  }
  
  loadLanguage(languageFile) {
	this.translations = languageFile;
  }
  
  t(key) {
    return this.translations[key] || key;
  }
};