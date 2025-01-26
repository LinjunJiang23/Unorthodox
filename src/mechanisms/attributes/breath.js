// src/mechanisms/attributes/breath.js

class BreathManager {
  constructor() {
	this.breath = 10;
	this.breathModifiers = {
	  run: 1,
	  regen: 1
	};
  }
  
  regenerate_stamina() {
	
  }
  
  reduce_stamina(typeOrValue, deltaTime = 1) {
	let modifier = 0;
	if (typeof typeOrValue === "string") {
	  modifier = this.staminaModifiers[typeOrValue];  
	} else if (typeof typeOrValue === "number") {
	  modifier = typeOrValue;
	} else {
	  console.log("The value passed to reduce_stamina is wrong.");
	  return;
	}
	
	if (modifier) {
	  this.stamina -= this.calculate_stamina_reduce(modifier, deltaTime);
	}
  }
  
  calculate_stamina_reduce(value, deltaTime) {
	if (typeof value === "number" && typeof deltaTime === "number") 
	  return modifier * deltaTime; 
  }
};