// scripts/mechanisms/inventory/filter.js

/**
 * filter inventory by item tags
 * @param {string} tag - the name of the tag object
 * @return {Map} filtered_items - return the items filtered by the given tag
 */
function filterInventoryByTag(tag) {
	//Ensure that tag exists
	let found = existing_tags.find(existing_tag => existing_tag.getName() === tag);
	if (found) {
		
	} else {
		console.log(`Tag ${tag} not found in existing tag, double check to ensure the tag is correct.`);
		return null;
	}
	
	let filtered_items;
	return filtered_items;
};