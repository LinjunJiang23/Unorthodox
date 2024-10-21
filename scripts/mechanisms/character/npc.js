

/* Characters */
/** 
 * Character class - for NPC generation
 * @param {string} name - names of characters
 * @param {string} intro - short intro of characters when examined
 * @param {number} friendliness - checks how casual they will act
 * @param {number} indifference - checks their moral stands & how they react to player's violating behaviors
 */
class Character {
  
  constructor(name, intro, friendliness, indifference, intent, relationships, attitude, gold) {
	if (typeof name === "string") this.name = name;
    if (typeof intro === "string") this.intro = intro;
    
	//Critical evals for relationship check
    if (typeof friendliness === "number") this.friendliness = friendliness;
    if (typeof indifference === "number") this.indifference = indifference;
    if (typeof intent === "number") this.intent = intent; //This checks for?
    if (typeof relaitonships === 'object') this.relationships = relationships; //Object to store relationships with characters
    if (typeof attitude === "number") this.attitude = attitude; //Their general attitude toward player
	if (typeof gold === "number") this.gold = gold;
	this.inventory = new Inventory();
  }
  
  casualChat() {
    if (this.friendliness > 10 && this.indifference < 10) {
  	  return "有什么需要？";
    }
  }
  
  cuss() {
	return "?";
  }
  
  stats() {
	const stats = {
		friendliness: this.friendliness,
		indifference: this.indifference,
		intent: this.intent,
		relationships: this.relationships,
		attitude: this.attitude
	};
	return stats;
  }
};
