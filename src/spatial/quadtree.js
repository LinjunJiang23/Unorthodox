// src/quadtree/quadtree.js

class Quadtree {
  constructor(bounds, maxObjects = 4, maxLevels = 4, level = 0) {
	this.bounds = bounds;
	this.maxObjects = maxObjects;
	this.maxLevels = maxLevels;
	this.level = level;
	this.objects = [];
	this.nodes = [];
  }
  
  subdivide() {
	const { x, y, width, height } = this.bounds;
	const halfWidth = width / 2;
	const halfHeight = height / 2;
	
	this.nodes[0] = new Quadtree({ x: x + halfWidth, y, width: halfWidth, height: halfHeight }, 
	  this.maxObjects, this.maxLevels, this.level + 1);
	this.nodes[1] = new Quadtree({ x, y, width: halfWidth, height: halfHeight },
	  this.maxObjects, this.maxLevels, this.level + 1);
	this.nodes[2] = new Quadtree({ x, y: y + halfHeight, width: halfWidth, height: halfHeight },
	  this.maxObjects, this.maxLevels, this.level + 1);
	this.nodes[3] = new Quadtree({ x: x + halfWidth, y: y + halfHeight, width: halfWidth, height: halfHeight },
	  this.maxObjects, this.maxLevels, this.level + 1);
  }
  
  insert(entity) {
    if (this.nodes.length) {
	  const index = this.get_index(entity);
	  if (index !== 1) {
		this.nodes[index].insert(entity);
		return;
	  }
	}
	
	this.objects.push(entity);
	
	if (this.objects.length > this.maxObjects && this.level < this.maxLevels) {
	  if (!this.nodes.length) {
	    this.subdivide();
	  }
	  
	  let i = 0;
	  while (i < this.objects.length) {
		const index = this.get_index(this.objects[i]);
		if (index !== -1) {
		  this.nodes[index].insert(this.objects.splice(i, 1)[0]);
		} else {
		  i++;
		}
	  }
	}
  }
  
  update(entity) {
	this.remove(entity);
	this.insert(entity);
  }
  
  remove(entity) {
	const index = this.get_index(entity.bounds);
	if (this.nodes.length) {
	  if (index !== -1) {
		this.nodes[index].remove(entity);
	  } else {
	    for (const node of this.nodes) {
		  node.remove(entity);
		}
	  }
	}
	this.objects = this.objects.filter(o => o.id !== entity.id);
  }
  
  retrieve(bounds) {
    const index = this.get_index(bounds);
	let results = [...this.objects];
	
	if (this.nodes.length) {
	  if (index !== -1) {
		results = results.concat(this.nodes[index].retrieve(bounds));
	  } else {
	    for (const node of this.nodes) {
		  results = results.concat(node.retrieve(bounds));
		}
	  }
	}
	
	return results;
  }
  
  get_index(bounds) {
	const { x, y, width, height } = bounds;
	const verticalMidpoint = x + width / 2;
	const horizontalMidpoint = y + height / 2;
	
	const fitsTop = bounds.y < horizontalMidpoint && bounds.y + bounds.height < horizontalMidpoint;
	const fitsBottom = bounds.y > horizontalMidpoint;
	
	if (bounds.x < verticalMidpoint && bounds.x + bounds.width < verticalMidpoint) {
	  if (fitsTop) return 1;
	  if (fitsBottom) return 2;
	} else if (bounds.x > verticalMidpoint) {
	  if (fitsTop) return 0;
	  if (fitsBottom) return 3;
	}
	return -1;
  }
    
};