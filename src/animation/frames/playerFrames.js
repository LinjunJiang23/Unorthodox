// scripts/animation/playerAnimations.js

const playerAnimations = {
  normal: {
	  idle: {
		down: new Animation({ 
					baseBody: [
						{x: 0, y: 0},
						{x: 128, y: 0},
						{x: 256, y: 0},
						{x: 384, y: 0}
			]}),
		right: new Animation({
						baseBody: [
							{x: 0, y: 128},
							{x: 128, y: 128},
							{x: 256, y: 128},
							{x: 384, y: 128}
			]}),
		up: new Animation({baseBody: [
				{x: 0, y: 256},
				{x: 128, y: 256},
				{x: 256, y: 256},
				{x: 384, y: 256}
			]}),
		left: new Animation({baseBody: [
				{x: 0, y: 384},
				{x: 128, y: 384},
				{x: 256, y: 384},
				{x: 384, y: 384}
			]}),
		downleft: new Animation({baseBody: [
				{x: 0, y: 512},
				{x: 128, y: 512},
				{x: 256, y: 512},
				{x: 384, y: 512}
			]}),
		downright: new Animation({baseBody: [
				{x: 0, y: 640},
				{x: 128, y: 640},
				{x: 256, y: 640},
				{x: 384, y: 640}
			]}),
		upleft: new Animation({baseBody: [
				{x: 0, y: 768},
				{x: 128, y: 768},
				{x: 256, y: 768},
				{x: 384, y: 768}
			]}),
		upright: new Animation({baseBody: [
				{x: 0, y: 896},
				{x: 128, y: 896},
				{x: 256, y: 896},
				{x: 384, y: 896}
			]}),
	  },
	  walk: {
		down: new Animation({ baseBody: [
				{x: 512, y: 0},
				{x: 640, y: 0},
				{x: 768, y: 0},
				{x: 896, y: 0}
			]}),
		right: new Animation({baseBody: [
				{x: 512, y: 128},
				{x: 640, y: 128},
				{x: 768, y: 128},
				{x: 896, y: 128}
			]}),
		up: new Animation({baseBody: [
				{x: 512, y: 256},
				{x: 640, y: 256},
				{x: 768, y: 256},
				{x: 896, y: 256}
			]}),
		left: new Animation({baseBody: [
				{x: 512, y: 384},
				{x: 640, y: 384},
				{x: 768, y: 384},
				{x: 896, y: 384}
			]}),
		downleft: new Animation({baseBody: [
				{x: 512, y: 512},
				{x: 640, y: 512},
				{x: 768, y: 512},
				{x: 896, y: 512}
			]}),
		downright: new Animation({baseBody: [
				{x: 512, y: 640},
				{x: 640, y: 640},
				{x: 768, y: 640},
				{x: 896, y: 640}
			]}),
		upleft: new Animation({baseBody: [
				{x: 512, y: 768},
				{x: 640, y: 768},
				{x: 768, y: 768},
				{x: 896, y: 768}
			]}),
		upright: new Animation({baseBody: [
				{x: 512, y: 896},
				{x: 640, y: 896},
				{x: 768, y: 896},
				{x: 896, y: 896}
			]}),
	  },
	  run: {
		down: new Animation({baseBody: [
				{x: 1024, y: 0},
				{x: 1152, y: 0},
				{x: 1280, y: 0},
				{x: 1408, y: 0}
			  ]}),
		right: new Animation({baseBody: [
				{x: 1024, y: 128},
				{x: 1152, y: 128},
				{x: 1280, y: 128},
				{x: 1408, y: 128}
			]}),
		up: new Animation({baseBody: [
				{x: 1024, y: 256},
				{x: 1152, y: 256},
				{x: 1280, y: 256},
				{x: 1408, y: 256}
			]}),
		left: new Animation({baseBody: [
				{x: 1024, y: 384},
				{x: 1152, y: 384},
				{x: 1280, y: 384},
				{x: 1408, y: 384}
			]}),
		downleft: new Animation({baseBody: [
				{x: 1024, y: 512},
				{x: 1152, y: 512},
				{x: 1280, y: 512},
				{x: 1408, y: 512}
			]}),
		downright: new Animation({baseBody: [
				{x: 1024, y: 640},
				{x: 1152, y: 640},
				{x: 1280, y: 640},
				{x: 1408, y: 640}
			]}),
		upleft: new Animation({baseBody: [
				{x: 1024, y: 768},
				{x: 1152, y: 768},
				{x: 1280, y: 768},
				{x: 1408, y: 768}
			]}),
		upright: new Animation({baseBody: [
				{x: 1024, y: 896},
				{x: 1152, y: 896},
				{x: 1280, y: 896},
				{x: 1408, y: 896}
			]})
	  }
  },
  comabt: {
	  
  },
  stealth: {
  }
};