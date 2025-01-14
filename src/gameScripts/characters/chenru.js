const chenru_interaction_script = {
	script_ID: 'chenru_normal_interaction',
	default_speaker: null,
	require_focus: true,
	start_node: "start",
	nodes: {
		'start': {
			conditions: [
				{
					evaluate: {
						check: [
							{
								type: 'mood',
								value: "upset",
								next_node: 'moody_greet'
							}
						]
					}
				}
			]
		},
		'moody_greet': {
			dialogue: [
				{content:[{text: '怎么了？'}]}
			]
		}
	}
};