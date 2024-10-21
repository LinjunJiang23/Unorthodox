class TypeWriter{
	
	constructor() {
		if (TypeWriter.instance) {
			return TypeWriter.instance;
		}
		this.interval = null;
		this.isTyping = false;
		this.type_index = 0;
		this.str = '';
		this.$element = null;
		this.finishingEvent = null;
		
		TypeWriter.instance = this;
	}
	
	type(str, elementname, speed, finishingEvent = null) {
		// Handle both jQuery selector string and direct DOM/jQuery element
		if (this.interval) {
			clearInterval(this.interval);
		}
		
		this.str = str;
		this.$element = (typeof elementname === "string") ? $(elementname) : $(elementname);
		this.isTyping = true;
		if (finishingEvent !== null && 
				typeof finishingEvent === 'function')
					this.finishingEvent = finishingEvent;
		this.$element.text('');
		this.type_index = 0;
		// Function to type each character
		this.interval = setInterval(() => {
			if (this.type_index < this.str.length) {
			let current_str = this.$element.text() + this.str.charAt(this.type_index);
			this.$element.text(current_str); // Append the next character
			this.type_index++;
			} else {
				if (this.finishingEvent !== null && 
				typeof this.finishingEvent === 'function') this.finishingEvent();
				this.isTyping = false;
				clearInterval(this.interval);
			}
		}, speed);
	}
	
	finishType() {
	  if (this.type_index < this.str.length) {
		clearInterval(this.interval);
		this.$element.text(this.str);
		this.isTyping = false;
	    if (this.finishingEvent !== null && 
			typeof this.finishingEvent === 'function') this.finishingEvent();
	  }
    }
	
	getIsTyping() {
		return this.isTyping;
	}
};

let typeWriter = new TypeWriter();