// scripts/mechanisms/physics/environment/envManager.js

/** 
 * This manages player's current surrounding
 */ 
class EnvManager {
  constructor(logic) {
	this.logic = logic;
	this.eventManager = this.logic.eventManager;
	this.currentArea = 'testLayer';
	this.env;
	this.x = 0;
	this.y = 0;
	this.eventManager.on('getEnvDetails', (payload) => {
	  const { types, cb } = payload;
	  if (!Array.isArray(types)) this.eventManager.trigger('error', { type: 'param', 
	    message: 'Param passed to getEnvDetails is not in array format', context: { param: payload.types } });
	  const val = {};
	  types.forEach(type => val[type] = this[type]);
	  if (payload.cb) cb(val);
	});
  }

  update(timestamp) {
	
  }
	
};