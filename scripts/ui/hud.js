// scripts/ui/hud.js

function initHUD() {
  $('#hud').append(`<div class="stat-bars"><label>磨损</label>\
	<div class="bar-hp"></div>\
	<label>灵气</label>\
	<div class="bar-mp"></div>\
	<label>灵力</label>\
	<div class="bar-exp"></div>\
	<label>阶级</label>\
	<div class="bar-lv"></div>\
    </div>`);
	$('#hud').append('<div id="inventory-horizontal"></div>');
	$('#hud').append('<div class="currency"><label>灵石：</label><div class="gold"></div></div>');
	$('#hud').append('<div class="actions">快捷行动</div>');
	$('#hud').append('<div class="time"></div>');
};

