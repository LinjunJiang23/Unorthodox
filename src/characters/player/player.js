// src/characters/player/player.js

/** 
 * 
 * @property {Object} eventManager
 * @property 
 */
class Player extends BaseCharacter {
  constructor(eventManager) {
	super();
	this.eventManager = eventManager;
	this.id = 'player';
	this.tag = 'player';
	this.init();
  }
  
  init() {
	const varsNeedInit = ['lname', 'fname', 'traitName1', 'traitDesc1', 'traitName2', 'traitDesc2', 'intro'];
	const _translations = {}; 
	this.eventManager.trigger('translate', { 
	  keys: ['player_default_lname', 'player_default_fname', 'player_default_trait_name_1', 
	    'player_default_trait_desc_1', 'player_default_trait_name_2', 'player_default_trait_desc_2', 'player_default_intro'], 
	  cb: (translatedTexts) => {
		for (let i = 0; i < translatedTexts.length; i++) {
		  const k = varsNeedInit[i];
		  _translations[k] = translatedTexts[i];
	}}});
	this.traits = new CharacterTraitManager([
	  new Trait(_translations['traitName1'], _translations['traitDesc1'], true, 'relationship', 100),
	  new Trait(_translations['traitName2'], _translations['traitDesc2'], true, 'relationship', 100)
	]);
	this.stats = new Stat();
	this.inventory = new Inventory([]);
	this.app = new PlayerAppManager(this);
	this.model = new PlayerModel(this);
	this.relationships = new RelationshipManager();
	this.actions = new ActionManager(this);
	this.actions.register_action('hold');
	this.actions.register_action('lift');
	this.actions.register_action('drop');
	this.actions.register_action('drag');
  }

  /** 
   * sets player's first name and last name
   * currently allows for the option of no first name or no last name
   * @param {object} name - takes the format of {lname: '', fname: ''}
   */
  set_name(name) {
	if (this['fname'] && this['lname']) {
	  this.lname = name.lname;
	  this.fname = name.fname;
	} else {
	  console.log('Player Name Input Format is not correct, the current format is: ', name);
	  console.log('Expected format like: { lname: "", fname: "" }');
	}
  }
  
  move(newX, newY) {
	this.model.change_physical_position({ x: newX, y: newY });
  }
	
  get_position() {
	return {x: this.model.physics.x, y: this.model.physics.y};
  }
};
