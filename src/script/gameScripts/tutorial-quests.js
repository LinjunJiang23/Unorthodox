const tutorial_quests = {
  id: 'tutorial_quests',
  require_focus: false,
  quests: [
    {
	  title: '村好剑',
	  type: 'side',
	  requestor: {
		type: 'character',
		tag: 'specials',
		id: 'chenru'
	  },
	  repeatable: false,
	  prerequisites: {
		conditions: [
		  {
			evaluate: {
			  check: [{'true'}]
			}				
		  }
		]
	  }
	  objectives: {
		
	  },
	  rewards: 
    }
  ]
};