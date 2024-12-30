// src/engine/input/utils/keyboardHelper.js

function addKeysToInput(keys) {
	if (Array.isArray(keys)) 
		engine.inputHandler.add_keys(keys);
};

function removeKeysFromInput(keys) {
	if (Array.isArray(keys)) 
		engine.inputHandler.remove_keys(keys);
};