/** 
 * Simple API that supports putting texts in an element, typewriting, 
 * clearing texts in an element, and finishType. 
 * @property interval
 * @property {boolean} isTyping - whether typewriter is typing or not
 * @property {number} type_index - the index of current typing character
 * @property {string} str - given string
 */
const TextProcessor = {
	interval: null,
	isTyping: false,
	type_index: 0,
	str: '',
	
	processText(textObject, ele) {
		const { text: str, noClear = false, effect, type } = textObject;
		
		if (effect) {
			this.applyEffects(ele, textObject.effect);
		} else {
			this.removeEffects(ele);
		}
		
		
		if (type) {
			this.applyTypeWrite(str, ele, type, noClear);
		} else {
			this.displayPlainText(str, ele, noClear);
		}
	},
	
	displayPlainText(str, ele, noClear) {
		if (!noClear) this.clearTexts(ele);
		
		ele.textContent += str;
	},
	
	typeWrite(str, speed, ele, noClear = false) {
		if (this.interval) {
			clearInterval(this.interval);
		}
		
		this.str = str;
		this.isTyping = true;
		this.type_index = 0;

		if (!noClear) this.clearTexts(ele);
		
		this.interval = setInterval(() => {
		  
		  if (this.type_index < this.str.length) {

			ele.textContent += this.str.charAt(this.type_index);
			this.type_index++;
		  
		  } else {
			this.isTyping = false;
			clearInterval(this.interval);
		  }
		}, speed);
	},
	
	clearTexts(ele) {
		ele.textContent = '';
	},
	
	finishType(ele) {
	  if (this.type_index < this.str.length) {
		clearInterval(this.interval);
		this.isTyping = false;
		this.displayPlainText(this.str, ele);
	  }
    },
	
	applyEffects(ele, effect) {
		const effectMap = {
			shake: () => ele.classList.add('shake-effect'),
			colorChange: () => ele.style.color = 'red',
			// Add more effects here as needed
		};

		if (effectMap[effect]) effectMap[effect]();
	},
	
	removeEffects(ele) {
		ele.classList.remove('shake-effect');
		ele.style.color = "black";
	},
	
	applyTypeWrite(str, ele, type, noClear) {
		const speeds = {
			normal: 60,
			slow: 500,
			fast: 1,
		};

		const speed = speeds[type] || 60;  // Default to normal speed
		this.typeWrite(str, speed, ele, noClear);
	}
	
};