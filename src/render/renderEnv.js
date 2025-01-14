// src/render/renderEnv.js

class RenderEnv {
  constructor(eventManager) {
	this.eventManager = eventManager;
  }
	
  render_env(data) {
	const { currentArea } = data;
	const bgData = this.get_background(currentArea);
	const terrainData = this.get_terrain(currentArea);
	const interactablesData = this.get_interactables();
	const particleData = this.get_particle();
	const lightingData = this.get_lighting();
	const weatherData = this.get_weather();
		
	const envData = {
	  weather: weatherData,
	  lighting: lightingData,
	  particle: particleData,
	  interactables: interactablesData,
	  terrain: terrainData,
	  background: bgData
	};
	return envData;
  }
	
  render_background(currentArea) {
	
  }
	
  render_terrain(currentArea) {
	return null;
  }
	
  render_interactables(currentArea) {
	return null;
  }
	
  get_particle() {
	return null;
  }
	
  get_lighting() {
	return null;
  }
	
  get_weather() {
	return null;
  }
};
