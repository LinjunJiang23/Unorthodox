// src/world/worldRegion.js

class Region {
  constructor(name, id, bounds) {
	this.name = name;
	this.id = id;
	this.bounds = bounds;
	this.quadtree = new Quadtree(bounds);
	this.entities = new Set();
	this.isLocked = true;
  }
  
  add_entity(entity) {
	this.entities.add(entity);
	this.quadtree.add_entity(entity);
  }
  
  remove_entity(entity) {
	this.entities.delete(entity);
	this.quadtree.remove_entity(entity);
  }
  
  update_entity(entity) {
	this.quadtree.update(entity);
  }
};

class Area {
  constructor(name, id) {
	this.id = id;
	this.name = name;
	this.regions = new Map(); // Map of regions by id
	this.activeRegions = new Set();
	this.isLocked = true;
  }
  
  add_region(regionName, regionId, bounds) {
	if (!this.regions.has(regionId))
      this.regions.set(regionId, new Region(regionName, regionId, bounds));
  }
  
  activate_region(regionId) {
	const region = this.regions.get(regionId);
	if (this.regions.has(regionId) && !this.regions.get(regionId).isLocked) 
	  this.activeRegions.add(regionId);
  }
  
  unactivate_region(regionId) {
	if (this.activeRegions.has(regionId) && this.regions.has(regionId)) 
	  this.activeRegions.delete(regionId);
  }
  
  find(id) {
    if (this.regions.has(id)) return this.regions.get(id);
	return null;
  }
  
};

class Realm {
  constructor(name, id) {
    this.name = name;
	this.id = id;
	this.areas = new Map();
	this.activeAreas = new Set();
	this.isLocked = true;
  }
  
  add_area(areaName, areaId) {
    this.areas.set(areaId, new Area(areaName, areaId));
  }
  
  activate_area(areaId) {
	if (this.areas.has(areaId) && !this.areas.get(realmId).isLocked) {
	  this.activeAreas.add(areaId);
	}
  }
  
  unactivate_area(areaId) {
	if (this.areas.has(areaId) && this.activeAreas.has(areaId)) {
	  this.activeAreas.delete(areaId);
	}
  }
  
  find(id) {
    if (this.areas.has(id)) return this.areas.get(id);
	const aIterator = this.areas.values();
	for (const _area of this.areas.values()) {
	  const found = _area.find(id);
	  if (found) return found;
	}
	return null;
  }
  
};

class World {
  constructor(eventManager) {
	this.eventManager = eventManager;
	this.realms = new Map();
	this.activeRealms = new Set();
  }
  
  add_realm(realmId, realmName) {
	if (!this.realms.has(realmId))
	  this.realms.set(realmId, new Realm(realmName, realmId));
  }
  
  activate_realm(realmId) {
	if (this.realms.has(realmId) && !this.realms.get(realmId).isLocked) 
	  this.activeRealms.add(realmId);
  }
  
  unactivate_realm(realmId) {
	if (this.realms.has(realmId) && this.activeRealms.has(realmId)) 
	  this.activeRealms.delete(realmId);
  }
  
  find(id) {
    if (this.realms.has(id)) return this.realms.get(id);
	for (const _realm of this.realms.values()) {
	  const found = _realm.find(id);
	  if (found) return found;
	}
  }
  
  init_events() {
    this.eventManager.on('createCharacter', (payload) => {
	  const { regionId, entity } = payload;
	  const region = this.find(regionId);
	  if (region) region.add_entity(entity);
	});
	this.eventManager.on('createItem', (payload) => {
	  const { regionId, entity } = payload;
	  const region = this.find(regionId);
	  if (region) region.add_entity(entity);
	});
	this.eventManager.on('characterMoved', (payload) => {
	  const { entity, oldRegionId, newRegionId } = payload;
	  const oldRegion = this.find(oldRegionId);
	  if (newRegionId) {
		oldRegion.remove_entity(entity);
		const newRegion = this.find(newRegionId);
		newRegion.add_entity(entity);
	  }
	});
  }
};