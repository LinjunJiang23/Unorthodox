// src/render/sceneGraph.js


class SceneNode {
  constructor(id, data) {
	Object.defineProperty(this, 'id', {
	  get: id
	});
	this.parent = null;
	this.children = [];
	this.data = {};
	if (data) {
	  Object.defineProperties(this.data, {
		rotation: { get: data.rotation },
		scale: { get: data.scale },
		spriteSheet: { get: data.spriteSheet },
		imageX: { get: data.imageX },
		imageY: { get: data.imageY },
		captureWidth: { get: data.captureWidth },
		captureHeight: { get: data.captureHeight },
		canvasX: { get: data.canvasX },
		canvasY: { get: data.canvasY },
		canvasWidth: { get: data.canvasWidth },
		canvasHeight: { get: data.canvasHeight }
	  });
	  this.data.layer = data.layer;
	  this.data.tags = data.tags;
	}
  }
  
  add_child(node) {
	node.parent = this;
    this.children.push(node);
  }
  
  remove_child(node) {
	this.children = this.children.filter(child => child !== node);
	node.parent = null;
  }
  
  get_world_transform() {
	if (!this.parent) {
	  return { rotation: this.data.rotation, scale: this.data.scale, 
	    canvasX: this.data.canvasX, canvasY: this.data.canvasY };
	}
	
	const parentTransform = this.parent.get_world_transform();
	return {
	  x: parentTransform.canvasX + this.data.canvasX,
	  y: parentTransform.canvasY + this.data.canvasY,
	  rotation: parentTransform.rotation + this.data.rotation,
	  scale: {
	    x: parentTransform.scale.x * this.data.scale.x,
		y: parentTransform.scale.y * this.data.scale.y
	  }
	};
  }
  
  reset_node() {
	this.data = {
	  rotation: 0,
	  scale: {x: 1, y: 1},
	  spriteSheet: null,
	  imageX: 0,
	  imageY: 0,
	  captureWidth: 0,
	  captureHeight: 0,
	  canvasX: 0,
	  canvasY: 0,
	  layer: null,
	  tags: []
	};
	this.children = [];
  }
  
};

class SceneGraph {
  constructor(eventManager) {
	this.eventManager = eventManager;
	this.root = new SceneNode(() => "Root");
	this.init_events();
  }
  
  add_node(node, parent = this.root) {
	parent.add_child(node);
  }
  
  remove_node(node) {
    if (node.parent) {
	  node.parent.remove_child(node);
	}
  }
  
  traverse(callback) {
    const visit = (node) => {
	  callback(node);
	  node.children.forEach(child => visit(child));
	};
	visit(this.root);
  }
  
  get_renderable_nodes() {
    const renderables = [];
	this.traverse(node => {
	  renderables.push(node);
	});
	return renderables;
  }
  
  init_events() {
	this.eventManager.on('addSceneNode', (payload) => {
	  const { node, parent } = payload;
	  this.add_node(node, parent);
	});
	this.eventManager.on('removeSceneNode', (payload) => {
	  const { node } = payload;
	  this.remove_node(node);
	});
  }
  
  clear_scene_graph() {
	this.root.reset_node();
  }
  
};