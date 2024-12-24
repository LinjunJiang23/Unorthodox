function updatePointOnMiniMap(point, x, y) {
    // This function would update the visual position of the point in the mini-map
    point.element.style.left = `${x}px`;
    point.element.style.top = `${y}px`;
}

function updateMiniMap(playerX, playerY, points, mapWidth, mapHeight, miniMapWidth, miniMapHeight) {
    // Scale all points based on the mini-map dimensions
    points.forEach(point => {
        const scaledX = (point.x / mapWidth) * miniMapWidth;
        const scaledY = (point.y / mapHeight) * miniMapHeight;
        
        // Update the point position relative to the player's location
        // Here, assuming player is always centered in the mini-map:
        const relativeX = scaledX - playerX + miniMapWidth / 2;
        const relativeY = scaledY - playerY + miniMapHeight / 2;
        
        // Update the display of each point on the mini-map
        updatePointOnMiniMap(point, relativeX, relativeY);
    });
}

/** MiniMap UI
 * Currently have the following functionality: 
 */
const miniMapUI = () => {
	let current = worldMap.current_point;
	$('.map-mini').append(`
    <label>${worldMap.current_realm.name}-${worldMap.current_location.name}</label>
	<a class="link-map">
        <svg xmlns="http://www.w3.org/2000/svg" id="map-current" style="width: 150px; height: 150px;">
            <image href="./img/maps/${current.name}.png"></image>
            <circle cx="75" cy="75" r="75" style="fill-opacity: 0;"/>
            <text x="40" y="20" width="20" height="20">${current.name}</text>
        </svg>
    </a>
`);

	$('.map').append('</svg>');
};

// Handles slight zoom in and zoom out when user click once
$(document).on('click', '.link-map', function() {
	let $svg = $(this).find('svg');  // Target the SVG inside the clicked link
    let $circle = $svg.find('circle'); // Find the circle inside the SVG
	if ($svg.css("width") === "150px" && $svg.css("height") === "150px") {
        $svg.css({ "width": "300px", "height": "300px" });
        $circle.attr({ "cx": "150", "cy": "150", "r": "150" });
    } else {
        $svg.css({ "width": "150px", "height": "150px" });
        $circle.attr({ "cx": "75", "cy": "75", "r": "75" });
    }
});

//$(document).on('dblclick', '.link-map', function() {
	//This should open up the map functionality
//});

