const overlayOpened = new CustomEvent('overlayShowed');

function createOverlay() {
	if ($('#overlayContainer').length === 0) {
		$('#story').append('<div id="overlayContainer" style="display:none;">');
		$('#overlayContainer').append('<div class="overlay">');
		$('.overlay').append('<div id="overlayTabs" class="tab"></div>');
		$('.overlay').append(`<div class="overlayClose">x</div>`);
		$('.overlay').append('<div id="overlayContent"></div>');
		$('#overlayContainer').append('</div>');
		$('#story').append('</div>');
	}
};

function closeOverlay() {
	$('#overlayContainer').hide();
};

function updateOverlay(content) {
	$('#overlayContent').html(content);
	$('#overlayContainer').show();
};

$(document).on('click', '.overlayClose', () => {closeOverlay();});