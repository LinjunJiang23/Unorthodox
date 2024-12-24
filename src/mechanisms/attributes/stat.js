// scripts/mechanisms/attributes/stat.js


/**
 * Stat manager
 */
class StatManager {
	
	constructor() {
		this.core_stats = {
			intelligence: 1,
			charm: 1,
			luck: 0,
			constitution: 1,
			resentment: 1,
			insight: 1
		};
		this.stat_point = 15;
		this.derived_stats = {
			lv: 1,
			hp: 1,
			mp: 0,
			exp: 0
		};
		this.skill_point = 5;
	}
	
	setCoreStat(changedVal, type) {
		if (this.core_stats.hasOwnProperty(type)) {
            // Additional checks can be added depending on the type of stat
            if (typeof this.core_stats[type] === typeof changedVal) {
                this.core_stats[type] = changedVal;
				console.log(`Property ${type} changed.`);
            } else {
                console.error(`Invalid type for ${type}. Expected ${typeof this[type]}, got ${typeof changedVal}.`);
            }
        } else {
            console.error(`Property ${type} does not exist on Player.`);
        }
	}
	
	setStatPoint(points) {
		if (typeof points === "number" && points > 0 && points < 1000) {
			this.stat_point = points;
		}
	}
	
	getCoreStats() {
		return this.core_stats;
	}
	
	getStatPoint() {
		return this.stat_point;
	}
		
	getDerivedStats() {
		return this.derived_stats;
	}
};
