// src/time/timeManager.js
class TimeManager {
	constructor(engine) {
		this.engine = engine;
		this.gameTime = {
			hour: 6,
			minute: 0,
			second: 0,
			day: 1,
		}
		this.isDaytime = true;
		this.isCurfew = false
	}
	
	update(timestamp) {
		const deltaTime = (timestamp - this.engine.lastUpdate) / 1000;
		this.engine.lastUpdate = timestamp;
		this.inc_time(deltaTime, 'second');
	}
	
	inc_time(amount, unit = "second") {
		if (['second', 'minute', 'hour', 'day'].includes(unit)) 
			this.gameTime[unit] += amount;
		this.roll_over();
	}
	
	roll_over() {
		let curSecond = this.gameTime.second;
		let curMinute = this.gameTime.minute;
		let curHour = this.gameTime.hour;
		let curDay = this.gameTime.day;
		//Inc time
		if (curMinute >= 60) {
			curMinute -= 60;
			curMinute++;
		}
		if (curMinute >= 60) {
			curMinute -= 60;
			curHour++;
		}
		if (curHour >= 24) {
			curHour -= 24;
			gameTime.day++;
		}
		
		//Dec time
		if (curMinute < 0) {
			curMinute += 60;
			curMinute--;
		}
		if (curMinute < 0) {
			curMinute += 60;
			curHour--;
		}
		if (curHour < 0) {
			curHour += 24;
			curDay--;
		}
		
		//Curfew time is from 20:00 to 4:00
		this.isCurfew = this.gameTime.hour < 4 || this.gameTime.hour >= 20;
		
		//Day time is from 6:00 to 18:00
		this.isDaytime = this.gameTime.hour >= 6 && this.gameTime.hour < 18;
	}
};
