const prologue_tutorial = {
  script_ID: "prologue_tutorial",
  default_speaker: null,
  require_focus: true,
  start_node: 'start',
  nodes: {
	"start": {
	  dialogue: [
		{text: "t('prologue_tutorial_start_dialogue_1')"},
		{text: "t('prologue_tutorial_start_dialogue_2')"},
		{text: "t('prologue_tutorial_start_dialogue_3')"},
		{text: "t('prologue_tutorial_start_dialogue_4')"},
		{	
		  text: "t('prologue_tutorial_start_dialogue_5')", 
		  effect: 'colorChange'
		}
	  ],
	  choice: {
	    options: [
		  {
			text: 't("prologue_tutorial_start_choice_1")',
			next_node: "struggle" 
		  },
		  {
			text: 't("prologue_tutorial_start_choice_2")',
			next_node: "plead"
		  },
		  {
			text: 't("prologue_tutorial_start_choice_3")',
			next_node: "give up"
		  }
		],
		wait_too_long: [
		  {
			text: 't("prologue_tutorial_start_wait_too_long_1")',
			timeout_duration: 10000
		  }
		]
	  }
	},
	"struggle": {
	  dialogue: [
		{ text: 't("prologue_tutorial_struggle_dialogue_1")'},
	  ],
	  conditions: [
		{
		  evaluate: {
			type: 'parallel',
			success_threshold: 2,
			fail_threshold: 0,
			check: [ 
			  new Condition ({
				type: 'con',
				eventType: 'statChange', 
				value: 10,
				operator: '>='
			  }),
			  new Condition({ 
			    type: 'insight',
				eventType: 'statChange',
				operator: '>=',
				value: 10
			  })
			]
		  },
		  next_node: "struggle_success"
		},
		{
		  evaluate: {
			check: [
			  new Condition({
				eventType: 'relationshipChange',
				characterID: 'specials_chenru',
				targetID: 'player',
				type: 'fl.value',
				operator: '>=',
				value: 10
			  })
			]
		  },
		  next_node: "struggle_success"
		},
		{
		  evaluate: {
			check: [
			  new Condition({
				eventType: "fallback"
			  })
			]
		  },
		  next_node: "struggle_fail"
		}
	  ]
	},
	"struggle_success": {
	  dialogue: [
	    {text: 't("prologue_tutorial_struggle_success_dialogue_1")'},
		{text: 't("prologue_tutorial_struggle_success_dialogue_2")'}
	  ]
	},
	"struggle_fail": {
	  dialogue: [
	    { text: 't("prologue_tutorial_struggle_fail_dialogue_1")'},
	    { text: "Huh. Aren't you something special.", 
		  speaker: {
			name: 't("chenru_name")',
			characterID: "specials_chenru",
			emotion: "curious",
			portrait: "neutral"
		  }
		},
		
		
	  ]
	}
  }
};  




