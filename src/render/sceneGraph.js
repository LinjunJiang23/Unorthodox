// src/render/sceneGraph.js


class SceneNode {
  constructor(id, data) {
	this.id = id;
	this.parent = null;
	this.children = [];
	this.data = {
	  rotation: data.rotation || 0,
	  scale: data.scale || {x: 1, y: 1},
	  spriteSheet: data.spriteSheet || null,
	  imageX: data.imageX || 0,
	  imageY: data.imageY || 0,
	  captureWidth: data.width || 0,
	  captureHeight: data.height || 0,
	  canvasX: data.canvasX || 0,
	  canvasY: data.canvasY || 0,
	  layer: data.layer || null,
	  tags: data.tags || [],
	  animation: data.animation || null
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
	  return { ...rotation: this.data.rotation, scale: this.data.scale, canvasX: this.data.canvasX, canvasY: this.data.canvasY };
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
};

class SceneGraph {
  constructor() {
	this.root = new SceneNode("Root");
  }
  
  addNode(node, parent = this.root) {
	parent.addChild(node);
  }
  
  removeNode(node) {
    if (node.parent) {
	  node.parent.removeChild(node);
	}
  }
  
  traverse(callback) {
    const visit = (node) => {
	  callback(node);
	  node.children.forEach(child => visit(child));
	};
	visit(this.root);
  }
  
  get_renderable_nodes {
    const renderables = [];
	this.traverse(node => {
	  if (node.data.visible) {
		renderables.push(node);
	  }
	});
	return renderables;
  }
  
};