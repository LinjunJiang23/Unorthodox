// src/relationship/relationshipHelpers.js


function relationshipProofTagAndType(target) {
	let type;
	const tag = target.tag;
	if (!tag) throw new Error('Target does not have a tag: ', target);
	if (target instanceof Item) {
		type = 'item';
	} else if (target instanceof BaseCharacter) {
		type = 'character';
	} else {
		throw new Error("The target of this relationship is neither an item nor a character");
	}
	const result = {type: type, tag: tag};
	return result;
};