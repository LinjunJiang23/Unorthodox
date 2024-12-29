// src/animation/utils/getModel.js

function getModel(character) {
	if (character instanceof BaseCharacter) return character.model;
}