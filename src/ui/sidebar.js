let playerExists = false;

$('#story-title').hide();

function createCustomSidebar() {
  if ($('#customSidebar').length === 0) {
	  $('#ui-bar-body').prepend("<div id='customSidebar'>");
	  $('#ui-bar-body').append("</div>");
	}
};

function createGameUISidebar() {
 if ($('#gameplay').length === 0) {
	$('#customSidebar').append("<div id='gameplay'>");
	$('#gameplay').append("<div class='functionality'>");
	$('.functionality').append(`
	  <button class="examine" value=0>检修</button>
	  <button>任务</button>
	  <button>人际</button>`);
	$('#customeSidebar').append('</div>');
	$('#customSidebar').append('<button id="map-ui">地图</button>');
 }
};

$(document).on('playerInitialized', () => {
	playerExists = true;
	createGameUISidebar(); 
	createHeader();
	createFooter();
	createOverlay();
});

$(document).on(':passagerender', (event) => {
	createCustomSidebar();
    if (playerExists) {
        updateHeader(); // Update the header on each passage render no matter what
		createFooter();  //Show Footer no matter what
    }
});

$(document).on('click', '.examine', (e) => {
	console.log(e.target.value);
	displayStats();
});

$('#ui-bar-toggle').on('click', () => {
	if (playerExists && $('#ui-bar').hasClass('stowed')) {
		createGameUISidebar();
	}
});