// scripts/animation/frames/playerFrames.js

const playerFrames = {
  normal: {
	down: {
		idle: {
		  baseBody: [
		    {x: 0, y: 0},
		    {x: 128, y: 0},
		    {x: 256, y: 0},
		    {x: 384, y: 0}
		  ]
		},
		walk: {
		  baseBody: [
			{x: 512, y: 0},
		    {x: 640, y: 0},
		    {x: 768, y: 0},
		    {x: 896, y: 0}
		  ]
		}
	},
	right: {
		idle: {
			baseBody: [
			{x: 0, y: 128},
		    {x: 128, y: 128},
		    {x: 256, y: 128},
		    {x: 384, y: 128}
			]
		},
		walk: {
			baseBody: [
			{x: 512, y: 128},
		    {x: 640, y: 128},
		    {x: 768, y: 128},
		    {x: 896, y: 128}
			]
		}
	},
	up: {
		idle: {
			baseBody: [
			{x: 0, y: 256},
		    {x: 128, y: 256},
		    {x: 256, y: 256},
		    {x: 384, y: 256}
			]
		},
		walk: {
			baseBody: [
			{x: 512, y: 256},
		    {x: 640, y: 256},
		    {x: 768, y: 256},
		    {x: 896, y: 256}
			]
		}
	},
	left: {
		idle: {
			baseBody: [
				{x: 0, y: 384},
				{x: 128, y: 384},
				{x: 256, y: 384},
				{x: 384, y: 384}
			]
		},
		walk: {
			baseBody: [
			{x: 512, y: 384},
		    {x: 640, y: 384},
		    {x: 768, y: 384},
		    {x: 896, y: 384}
			]
		}
	},
	downleft: {
		idle: {
			baseBody: [
			{x: 0, y: 512},
		    {x: 128, y: 512},
		    {x: 256, y: 512},
		    {x: 384, y: 512}
			]
		},
		walk: {
			baseBody: [
			{x: 512, y: 512},
		    {x: 640, y: 512},
		    {x: 768, y: 512},
		    {x: 896, y: 512}
			]
		}
	},
	downright: {
		idle: {
			baseBody: [
				{x: 0, y: 640},
				{x: 128, y: 640},
				{x: 256, y: 640},
				{x: 384, y: 640}
			]
		},
		walk: {
			baseBody: [
			{x: 512, y: 640},
		    {x: 640, y: 640},
		    {x: 768, y: 640},
		    {x: 896, y: 640}
			]
		}
	},
	upleft: {
		idle: {
			baseBody: [
				{x: 0, y: 768},
				{x: 128, y: 768},
				{x: 256, y: 768},
				{x: 384, y: 768}
			]
		},
		walk: {
			baseBody: [
			{x: 512, y: 768},
		    {x: 640, y: 768},
		    {x: 768, y: 768},
		    {x: 896, y: 768}
			]
		}
	},
	upright: {
		idle: {
			baseBody: [
			{x: 0, y: 896},
		    {x: 128, y: 896},
		    {x: 256, y: 896},
		    {x: 384, y: 896}
			]
		},
		walk: {
			baseBody: [
			{x: 512, y: 896},
		    {x: 640, y: 896},
		    {x: 768, y: 896},
		    {x: 896, y: 896}
			]
		}
	}
  },
  combat: {
  },
  stealth: {
  }
};