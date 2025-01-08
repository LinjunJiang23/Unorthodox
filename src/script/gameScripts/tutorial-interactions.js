// src/script/gameScripts/tutorial-interactions.js


const tutorial_interactions = {
  script_ID: 'tutorial_interactions',
  target_tag: 'chenru',
  require_focus: true,
  start_node: 'start',
  nodes: {
	'start': {
	  interactions: [
		{
			id: 'chat',
			text: '闲聊',
			next_node: 'casual_chat'
		},
		{
			id: 'confess',
			text: '表白',
			conditions: [ 
				{
					evaluate: {
						check: [
							{
								type: 'relationship',
								attribute: 'fl',
								operator: '>=',
								value: 50
							}
						]
					}
				}
			],
			next_node: 'casual_confess'
		},
		{
			id: 'cuss',
			text: '侮辱',
			action: [
				{
					type: 'relationship',
					attribute: 'fl',
					baseInfluence: 1
				},
				{
					type: 'log',
					message: '我对着陈汝骂骂咧咧。'
				},
				{
					type: 'random_dialogue',
					pool: [
						{
							id: 'casual_cuss',
							conditions: [
								{
									check: [
										{
											type: 'relationship',
											from: 'chenru',
											attribute: 'fl',
											operator: '>=',
											value: 50
										}
									]
								}
							]
						}
					]
				}
			]
		}
	]
    },
    'casual_confess': {
	  dialogue: [
		{
			speaker: {
				name: '陈汝',
				character: 'chenru',
				emotion: 'surprised',
				portrait: 'surprised'
			},
			content: [
				{text: "...Hunger finally drives you crazy, huh?"}
			]
		}
	  ]
	},
	'casual_cuss': {
		dialogue: [
			{
			}
		]
	}
  }
};