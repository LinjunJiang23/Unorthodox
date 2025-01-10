/** 
 * Simple API that supports putting texts in an element, typewriting, 
 * clearing texts in an element, and finishType. 
 * @property interval
 * @property {boolean} isTyping - whether typewriter is typing or not
 * @property {number} type_index - the index of current typing character
 * @property {string} str - given string
 */
class TextProcessor {
  constructor() {
	this.interval= null;
	this.isTyping= false;
	this.type_index= 0;
	this.str= '';
  }
  
  processText(textObject, ele) {	
	const str = textObject.text;
	const effect = textObject.effect;
	const type = textObject.type;
				
	if (effect) {
	  this.applyEffects(ele, textObject.effect);
	} else {
	  this.removeEffects(ele);
	}
		
	if (type === "plain") {
	  this.displayPlainText(str, ele);
	} else {
	  this.applyTypeWrite(str, ele, type);
	}
  }
	
  displayPlainText(textObject, ele) {
	ele.textContent = textObject.text;
  }
	
  typeWrite(str, speed, ele) {
	if (this.interval) {
	  clearInterval(this.interval);
	}
				
	this.str = str;
	this.isTyping = true;
	this.type_index = 0;
		
	this.interval = setInterval(() => {
		  
	  if (this.type_index < this.str.length) {
		ele.textContent += this.str.charAt(this.type_index);
		this.type_index++; 
	  } else {
		this.isTyping = false;
		clearInterval(this.interval);
	  }
	}, speed);
  }
	
  finishType(ele) {
	if (this.type_index < this.str.length) {
	  clearInterval(this.interval);
	  myPromise
	  .then(() => this.displayPlainText({text: this.str}, ele))
	  .then(() => this.isTyping = false);
	}
  }
	
  applyEffects(ele, effect) {
	const effectMap = {
	  shake: () => ele.classList.add('shake-effect'),
	  colorChange: () => ele.style.color = 'red',
			// Add more effects here as needed
	};

	if (effectMap[effect]) effectMap[effect]();
  }
	
  removeEffects(ele) {
	if (ele) { 
	  ele.classList.remove('shake-effect');
	  ele.style.color = "black";
	}
  }
	
  applyTypeWrite(str, ele, type) {
	const speeds = {
		slow: 500,
		fast: 1,
	};

	const speed = speeds[type] || 60;  // Default to normal speed
	this.typeWrite(str, speed, ele);
  }
};