// scripts/ui/dialogBox.js

/**
 * renderSpeakerIcon
 * @param speaker - determines whose icon is inserted
 */
async function renderSpeakerIcon(speaker) {
	try {
		let speakerName = speaker.name;
		let s = '';
		switch (speakerName) {
			case '陈汝':
				s = `./img/characters/main/chenru/${speaker.state}-${speaker.outfit}.png`;
				break;
		}
		$('.dialog-speaker-icon').attr('src', s);
	} catch (err) {
		console.error(err);
	}
};