// scripts/mechanisms/animation/frames.js

let animationSpriteSheets = {
	down: {
		walk: {
		  baseBody: [
		    {x: 0, y: 0},
		    {x: 128, y: 0},
		    {x: 256, y: 0},
		    {x: 384, y: 0}
		  ]
		},
		idle: {
		  baseBody: [
			{x: 0, y: 512},
		    {x: 128, y: 512},
		    {x: 256, y: 512},
		    {x: 384, y: 512}
		  ]
		}
	},
	left: {
		walk: {
			baseBody: [
				{x: 0, y: 384},
				{x: 128, y: 384},
				{x: 256, y: 384},
				{x: 384, y: 384}
			]
		},
		idle: {
			baseBody: [
			{x: 0, y: 512},
		    {x: 128, y: 512},
		    {x: 256, y: 512},
		    {x: 384, y: 512}
			]
		}
	},
	right: {
		walk: {
			baseBody: [
			{x: 0, y: 128},
		    {x: 128, y: 128},
		    {x: 256, y: 128},
		    {x: 384, y: 128}
			]
		},
		idle: {
			baseBody: [
			{x: 0, y: 512},
		    {x: 128, y: 512},
		    {x: 256, y: 512},
		    {x: 384, y: 512}
			]
		}
	},
	up: {
		walk: {
			baseBody: [
			{x: 0, y: 256},
		    {x: 128, y: 256},
		    {x: 256, y: 256},
		    {x: 384, y: 256}
			]
		},
		idle: {
			baseBody: [
			{x: 0, y: 512},
		    {x: 128, y: 512},
		    {x: 256, y: 512},
		    {x: 384, y: 512}
			]
		}
	}
};

let npcAnimationSpriteSheets = {
	down: {
		walk: {
		  baseBody: [
		    {x: 0, y: 0},
		    {x: 128, y: 0},
		    {x: 256, y: 0},
		    {x: 384, y: 0}
		  ]
		},
		idle: {
		  baseBody: [
			{x: 0, y: 512},
		    {x: 128, y: 512},
		    {x: 256, y: 512},
		    {x: 384, y: 512}
		  ]
		}
	},
	left: {
		walk: {
			baseBody: [
				{x: 0, y: 384},
				{x: 128, y: 384},
				{x: 256, y: 384},
				{x: 384, y: 384}
			]
		},
		idle: {
			baseBody: [
			{x: 0, y: 512},
		    {x: 128, y: 512},
		    {x: 256, y: 512},
		    {x: 384, y: 512}
			]
		}
	},
	right: {
		walk: {
			baseBody: [
			{x: 0, y: 128},
		    {x: 128, y: 128},
		    {x: 256, y: 128},
		    {x: 384, y: 128}
			]
		},
		idle: {
			baseBody: [
			{x: 0, y: 512},
		    {x: 128, y: 512},
		    {x: 256, y: 512},
		    {x: 384, y: 512}
			]
		}
	},
	up: {
		walk: {
			baseBody: [
			{x: 0, y: 256},
		    {x: 128, y: 256},
		    {x: 256, y: 256},
		    {x: 384, y: 256}
			]
		},
		idle: {
			baseBody: [
			{x: 0, y: 512},
		    {x: 128, y: 512},
		    {x: 256, y: 512},
		    {x: 384, y: 512}
			]
		}
	}
};