const tutorial_nodes = [
  {
	"id": "tutorial_1",
	"condition": null,
	"dialogue": [
	  {
		"speaker": null,
	    "content":
		[
		  {"text": '“此人面相和善，披风间却刀闪寒光。”', "type": 'normal', "effect": null},
		  {"text": '“你则正紧紧攥着其裤脚，与其空空如也钱袋。”', "type": 'normal', "effect": null},
		  {"text": '“撒手太迟，狡辩太晚。”', "type": 'normal', "effect": null},
		  {"text": '“对方微微一笑。”', "type": 'normal', "effect": null},
		  {"text": '“你脖颈皮一紧。”', "type": 'normal', "effect": 'colorChange'},
	    ],
		"choices": [
		  {
			//This choice demonstrates dice roll system
			"text": "“尝试挣脱对方拽着你衣领的手。”",
			"dice": {
				"check": {"core-stat": {
							"target": "player",
							"type": "constitution"
						 }
						},
				"DC": "10",
				"outcome": {
					"success": {
						"text": "“你四肢并用乱蹬乱挠，对方被你刮掉了一点点的血量，并更加伸长了胳膊，以防你能够到。”"
					},
					"fail": {
						"text": "“你四肢并用乱蹬乱挠，全招呼到了空气上。”"
					}
				}	
			},
			"next_node": "tutorial_2"
		  },
		  {
			//This choice demonstrates dice roll system
			"text": "“你低声下气、好言好语、苦苦哀求。”",
			"dice": {
				"check": {
					"core-stat": {
					  "target": "player",
					  "type": "charm"
					}
				},
				"DC": "10",
				"outcome": {
					"success": {
						"text": "“提着你衣领的手宽容地松开了，转而将你兜着胳肢窝捞了起来。往好处想，至少不会再有窒息的风险。”", 
						"relationship": {
							"target": "陈汝",
							"value": "99"
						}
					},
					"fail": {"text": "“你说得口干舌燥，对方仍然无动于衷。”"}
				},
				"result-hide": false
			},
			"next_node": "tutorial_2"
		  },
		  {
			//This choice demonstrates stat change
			"text": "“你心如死灰，怨念世道不公。”",
			"core-stat": {
				"target": "player",
				"type": "resentment",
				"value": "1",
				"change-hide": false
			},
			"next_node": "tutorial_2"
		  }
		]
	  }
	]
  },
  {
	  "id": "tutorial_2",
	  "condition": null,
	  "dialogue": [
	    {
		  "speaker": '陈汝',
	      "content": [
		    {"text": '“这小子，本帮老大。”', "type": 'normal', "effect": null}
		  ]
		},
		{
		  "speaker": null,
	      "content": [
			{"text": "“圆月高悬，金佛像笑看陈汝拍拍刚绑来的‘老大’。”", "type": "normal", "effect": null},
		  ]
	    },
		{
		  "speaker": '陈汝',
	      "content": [
			{"text": '“‘你，我亲人，保真。’”', "type": 'normal', "effect": null}
		  ]
		},
	    {
		  "speaker": null,
		  "content": [
		    {"text": '“万籁寂静，大眼瞪小眼。”', "type": 'normal', "effect": null},
		    {"text": '“众人一拥而上，对你嘘寒问暖。”', "type": 'normal', "effect": null},
		    {"text": '“你方才险些饿死街头，现下认祖又归宗，摇身一变，竟飞上枝头变鸡皇，继承了一个小小的——帮派？”', "type": 'normal', "effect": null}
		  ]
		}
	  ]
  }
]; 




