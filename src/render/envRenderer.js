// src/render/envRenderer.js

class EnvRenderer {
  constructor(renderManager) {
	this.renderManager = renderManager;
  }
  
  render() {
	this.render_particle();
	this.render_lighting();
	this.render_weather();
  }
	
  render_terrain() {
	return null;
  }
  
  render_particle() {
	return null;
  }
	
  render_lighting() {
	return null;
  }
	
  render_weather() {
	return null;
  }
  
};