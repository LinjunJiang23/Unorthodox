// scripts/mechanisms/NPC/utils.js

/**
 * Function to generate random names for NPCs
 */
function generateRandomName() {
	let name = {lname: "", fname: ""};
	//Generate a random number from 1 - 20
	let op = Math.floor(Math.random() * 20) + 1;  
	if (op === 13) { //Only has first name
		name.lname = null;
		//Generate a random number from 0 - 29
		let n = Math.floor(Math.random() * 30);
		name.fname = randomFName[n];
	} else if (op === 7) { //Only has last name
		name.fname = null;
		//Generate a random number from 0 - 29
		let n = Math.floor(Math.random() * 30);
		name.lname = randomLName[n];
	} else {
		//Character has first name and last name
		let n = Math.floor(Math.random() * 30);
		name.fname = randomFName[n];
		n = Math.floor(Math.random() * 30);
		name.lname = randomLName[n];
	}
	return name;
};

function getDirection(dx, dy) {
	
	if (dx > 0 && dy === 0) {
		return 'right';
	} else if (dx === 0 && dy < 0) {
		return 'up';
	} else if (dx === 0 && dy > 0) {
		return 'down';
	} else if (dx < 0 && dy === 0) {
		return 'left';
	} else if (dx > 0 && dy < 0) {
		return 'upright';
	} else if (dx > 0 && dy > 0) {
		return 'downright';
	} else if (dx < 0 && dy < 0) {
		return 'upleft';
	} else if (dx < 0 && dy > 0) {
		return 'downleft';
	}
	return "idle";
};