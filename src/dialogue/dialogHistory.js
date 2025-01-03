// scripts/mechanisms/dialog/dialogHistory.js

class DialogHistoryManager {
	constructor() {
		this.dialog_history = [];
	}
	
	save_dialog(dialog_line) {
		if (dialog_line.hasOwnProperty("speaker") && 
		    dialog_line.hasOwnProperty("text")) {
			this.dialog_history.push(dialog_line);
		} else if (dialog_line.hasOwnProperty("choice")) {
			this.dialog_history.push(dialog_line);
		}
	}
	
	clearHistory() {
		this.dialog_history = [];
	}
	
	showHistory() {
		let historyContainer = $('#dialog-history-container');
		historyContainer.empty();
		this.dialog_history.forEach(dialog => {
			if (dialog.hasOwnProperty("choice")) {
			  historyContainer.append(`<span class="dialog-history-speaker"><strong>${player.name}</strong></span>`);
			  historyContainer.append(`<div class="dialog-history-choice">${dialog.choice}</div>`);
			} else {
			  historyContainer.append(`<span class="dialog-history-speaker"><strong>${dialog.speaker}</strong></span>`);
			  historyContainer.append(`<div class="dialog-history-line">${dialog.text}</div>`);
			}
		});
		$('#dialog-history-container').removeClass('hidden');
		$('#dialog-history-container').show();
	}
	
	hideHistory() {
		$('#dialog-history-container').addClass('hidden');
		$('#dialog-history-container').hide();
	}
};

$(document).on('click', '#dialog-history-btn', () => {
	console.log("triggered");
	let historyVisible = $('#dialog-history-container').hasClass('hidden');
	
	if (historyVisible) {
		dialogHistory.showHistory();
	} else {
		dialogHistory.hideHistory();
	}
});