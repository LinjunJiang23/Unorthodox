// src/control/stateController.js


class StateController {
	constructor(leaderController) {
		this.leaderController = leaderController;
	}
	
	control_state(timestamp) {
	}
	
	control_idle(deltaTime) {
		const leader = this.leaderController.leader;
		if (leader.state === 'idle') {
			leader.idleTime += deltaTime;
		}
	}
};