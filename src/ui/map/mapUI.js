function generateMapUI(ele, x, y) {
/* 	let elementType = ele instanceof Location ? 'location' : ele instanceof Realm ? 'realm' : '';
	let content = `<div class="map-element ${elementType}">`; */

    // Show the current element's name (realm or location)
	console.log('triggered');
	let content = '';
	content += `<a class="navMap">
		<text x=${x} y=${y} width="10" height="10">${ele.name}</text></a>`
    return content;
};

const worldMapUI = () => {
	console.log('triggered');
	let x = 2;
	let content = '<image href="img/worldmap.png" x="0" y="0" alt="World Map"></image>';	
	worldMap.getRealms().forEach(realm => {
		content += generateMapUI(realm, x, 20);
		x += 40;
	});
	content += "</div>";
	return content;
};

const realmMapUI = (realm) => {
	let content = `<div class="map-realm-${realm.name}">`;
	content += `<image href="img/maps/${realm.name}.png" alt="${realm.name} Map"></image>`;
	realm.get_sub_elements().forEach(realm => {
        content += generateMapUI(realm);  // Use the same function for realms
    });
	content += '</div>';
	return content;
};

const locationMapUI = (loc) => {
	let content = `<div class="map-location-${loc.name}">`;
	content += `<image href="img/maps/${loc.name}.png" alt="${loc.name} Map"></image>`;
	loc.get_sub_elements().forEach(interactive_point => {
        content += generateMapUI(interactive_point);  // Use the same function for realms
    });
	content += '</div>';
	return content;
};

const interactivePointUI = (interactive_point) => {
	let content = `<div class="map-interactive_point-${interactive_point}">`;
	content += `<image href="img/maps/${interactive_point.name}.png" alt="${interactive_point.name} Map"></image>`;
	loc.get_sub_elements().forEach(interactive_point => {
        content += generateMapUI(interactive_point);  // Use the same function for realms
    });
	content += '</div>';
	return content;
};