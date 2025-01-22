// src/animation/animationSystem.js

/** 
 */
class AnimationSystem {
  constructor(eventManager) {
	this.eventManager = eventManager;
	this.animations = {};
	this.init_events();
  }
  
  update(timestamp, animationIds) {
	for (let key of animationIds) {
	  const current = this.animations[key];
	  if (current) {
		current.update(timestamp);
	  } else {
		console.log(`Animation with id: ${key} does not exist or isn't stored yet.`);
	  }
	}
  }
  
  get_animations(ids) {
    const founds = [];
	for (let key of ids) {
	  const current = this.animations[key];
	  if (current) founds.push(current);
	}
	return founds;
  }
  
  add_animation(id, animation) {
    if (animation instanceof AnimationManager) {
	  this.animations[id] = animation;
	} else {
	  this.eventManager.trigger('error', { type: 'param', 
	    message: "Param of animation passed to add_animation in animation system is not correct." });
	}
  }
  
  remove_animation(id) {
	if (this.animations[id]) {
	  delete this.animations[id];
	} else {
	  console.log(`${id} does not have animation store inside the animation system.`);
	}
  }
  
  init_events() {
    this.eventManager.on('createCharacter', (payload) => {
	  const { id, model } = payload.character;
	  console.log(payload.character);
	  this.add_animation(id, model.animation);
	});
	
	this.eventManager.on('destroyCharacter', (payload) => {
	  const { id } = payload;
	  this.remove_animation(id);
	});
	this.eventManager.on('changeCharacterState', (payload) => {
	  const { mode, state, direction, id } = payload.character;
	  this[id].change_current_animation(mode, state, direction);
	});
	this.eventManager.on('updateVisibility', (payload) => {
	  const { id, visible } = payload;
	  const a = this.get_animations([id]);
	  if (!a) return console.log("No animation is found with id: ", id);
	  if (visible) {
		this.update(0, [id]);
		console.log(a[0].sceneNode);
	    this.eventManager.trigger('addSceneNode', { node: a[0].sceneNode });
	  } else {
	    this.eventManager.trigger('removeSceneNode', { node: a.sceneNode });
	  }
	});
  }
};