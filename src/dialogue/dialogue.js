// src/dialogue/dialgoue.js

class Dialogue {
  constructor({ content, defaultSpeaker, repeatable}) {
    this.contents = [];
	this.currentSpeaker = defaultSpeaker;
	this.defaultSpeaker;
	this.curerntLineIndex = 0;
	this.repeatable = repeatable;
	this.isCompleted;
  }
  
  get_dialogue_line() {
	const currentLine = this.contents[this.currentLineIndex];
	if (!currentLine) {
	  this.isCompleted = true;
	  return;
	}
	
  }
};