const prologue_tutorial = 
{
	script_ID: "prologue_tutorial",
	default_speaker: null,
	require_focus: true,
	start_node: 'start',
	nodes: {
		"start": {
		  dialogue: [
			{
			  character: 'player',
			  content: [ 
				{text: '此人面相和善，披风间却刀闪寒光。'},
				{text: '我则正紧紧攥着其裤脚，与其空空如也钱袋。'},
				{text: '撒手太迟，狡辩太晚。'},
				{text: '对方微微一笑。'},
				{	
					text: '我脖颈皮一紧。', 
					effect: 'colorChange'
			    }
			  ]
			}
		  ],
		  choice: {
		    options: [
				{
					text: "挣脱",
					next_node: "struggle" 
				},
				{
					text: "求饶",
					next_node: "plead"
				},
				{
					text: "认命",
					next_node: "give up"
				}
			],
			wait_too_long: [
				{
					text: "我沉默地同这人对视良久，对方不耐烦地抓着我衣领将我拎了起来。",
					timeout_duration: 10000
				}
			]
		  }
		},
		"struggle": {
		  dialogue: [
			{
				content: [
					{
						text: "我怎么可能束手就擒，奋力挣脱！",
					}
				]
			}
		  ],
		  conditions: [
			{
				evaluate: {
					type: 'parallel',
					success_threshold: 2,
					fail_threshold: 0,
					check: [ 
						{
							type: "stat_check",
							attribute: "constitution",
							operator: ">=",
							value: 10
						},
						{
							type: "stat_check",
							attribute: "constitution",
							operator: ">=",
							value: 10
						}
					]
				},
				action: "functionManager.increase_friendliness(100)",
				next_node: "struggle_success"
			},
			{
				evaluate: {
					check: {
						type: "relationship_check",
						attribute: "friendliness",
						operator: ">=",
						value: 10,
					},
				},
				action: 'relationship',
				next_node: "struggle_success"
			},
			{
				evaluate: {
					check: "true"
				},
				action: "functionManager.increase_friendliness(10)",
				next_node: "struggle_fail"
			}
		  ]
		},
		"struggle_success": {
		  dialogue: [
		    {
			  content: [
		        {text: "我的四肢并用乱蹬乱挠很有效，对方猝不及防松开了手。"},
			    {text: "脸着地带来的剧痛令我头晕目眩，两眼一翻直接昏迷."}
			  ]
		    }
		  ]
		},
		"struggle_fail": {
		  dialogue: [
			{ content: {text: "我四肢并用乱蹬乱挠的奋力致使对方抻长了胳膊。"}},
			{
				speaker: {
					name: "陈汝",
					character: "chenru",
					emotion: "curious",
					portrait: "neutral"
				},
				content: {text: "Huh. Aren't you something special."}
			}
		  ],
		}
	}
};  




