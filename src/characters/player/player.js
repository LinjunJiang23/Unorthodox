// src/characters/player/player.js

/** 
 * 
 */
class Player extends BaseCharacter {
  static validStates = ['idle', 'walk', 'run', 'backup', 'jump'];
  static validActions = ['rest', 'hold', 'lift', 'drop', 'drag'];
	
  constructor(characterManager, eventManager) {
	super();
	this.characterManager = characterManager;
	this.eventManager = eventManager;
	this.id = 'player';
	this.tag = 'player';
	this.state = "idle";
	this.action = "rest";
	this.composure = 100;
	this.stats = new Stat();
	this.inventory = new Inventory([]);
	this.app = new PlayerAppManager(this);
	this.model = new PlayerModel(this);
	this.actions = new ActionManager(this);
	this.relationshipManager = new RelationshipManager();
	this.eventManager.trigger('createCharacter', { character: this });
	this.init();
  }
	
  init() {
	const varsNeedInit = ['lname', 'fname', 'traitName1', 'traitDesc1', 'traitName2', 'traitDesc2', 'intro'];
	this.eventManager.trigger('translate', 
	  { keys: ['player_default_lname', 'player_default_fname', 'player_default_trait_name_1', 
	  'player_default_trait_desc_1', 'player_default_trait_name_2', 'player_default_trait_desc_2', 'player_default_intro'], 
	  cb: (translatedTexts) => {
		for (let i = 0; i < translatedTexts.length; i++) {
		  const k = varsNeedInit[i];
		  this[k] = translatedTexts[i];
		}
	  }});
	  this.traits = new CharacterTraitManager([
	    new Trait(this.traitName1, this.traitDesc1, true, 'relationship', 100),
		new Trait(this.traitName2, this.traitDesc2, true, 'relationship', 100)
	  ]);
	  delete this.traitName1;
	  delete this.traitDesc1;
	  delete this.traitName2;
	  delete this.traitDesc2;
  }
	
  update(timestamp) {
	this.model.update(timestamp);
  }
	
  set_mode(mode) {
	if (Player.validModes.includes(mode)) {
	  if (this.mode !== mode) this.mode = mode;
	  this.eventManager.trigger('changeCharacterState', { character: this, entity: { 
	    bounds: this.model.physics
	  } });
	} else {
	  this.eventManager.trigger('error', { type: 'param', 
		message: "Unrecognized or empty param of state in set_state of player class." });
	}
  }
	
  set_state(state) {
	if (Player.validStates.includes(state)) {			
	  if (this.state !== state) this.state = state;
	} else {
	  	
	}
  }
	
  set_action(action) {
	if (Player.validActions.includes(action)) {
	  if (this.action !== action) this.action = action;
	} else {
	  this.eventManager.trigger('error', { type: 'param', 
		message: "Unrecognized or empty param of action in set_action of player class." });	}
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
	  console.log('Expected format like: {lname: "左", fname: "汶"}');
	}
  }
	
  get_position() {
	return {x: this.model.physics.x, y: this.model.physics.y};
  }
};
