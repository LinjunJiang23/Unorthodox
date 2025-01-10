// src/utils/checkReferences.js

function checkEventManager(eventManager) {
  if (!(eventManager instanceof eventManager)) 
	throw new Error('Param not an instance of EventManager: ', eventManager);
  return eventManager;
};

