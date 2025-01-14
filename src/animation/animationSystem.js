// src/animation/animationSystem.js


class AnimationSystem {
  constructor(eventManager) {
    this.eventManager = eventManager;
	this.characterAnimations = {};
	this.itemAnimations = {};
	this.eventManager.on('createCharacter', (payload) => {
	  const { tag, id, model} = payload;
	  this.add_character_animation(tag, id, model.animation);
	});
	this.eventManager.on('destroyCharacter', (payload) => {
	  const { tag, id } = payload;
	  this.remove_character_animation(tag, id);
	});
  }
  
  update(timestamp) {
	this.update_characters_animation(timestamp);
	this.update_item_animation(timestamp);
  }
  
  update_characters_animation(stamp) {
	const keys = Object.values(this.characterAnimations);
	for (let key of keys) {
	  for (let [character, animation] of Object.entries(this.characterAnimations[key])) {
	    animation.update(timestamp);
	  }
	}
  }
  
  add_character_animation(characterTag, characterID, animation) {
    if (animation instanceof AnimationManager) {
	  this.characterAnimations[characterTag][characterID] = animation;
	} else {
	  this.eventManager.trigger('error', { type: 'param', 
	    message: "Param of animation passed to add_character_animation in animation system is not correct." });
	}
  }
  
  remove_character_animation(characterTag, characterID) {
	if (this.characterAnimations[characterTag][characterID]) {
	  delete this.characterAnimations[characterTag][characterID];
	} else {
	  console.log(`${characterTag} Character id ${characterID} does not have animation store inside the animation system.`);
	}
  }
  
};