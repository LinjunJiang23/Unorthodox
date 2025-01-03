// scripts/mechanisms/attributes/stat.js


/**
 * Stat manager
 */
class Stat {
	
	constructor() {
		this.intel = 1; //Abbreviation of INTELLIGENCE
		this.cha = 1; //Abbreviation of CHARISMA
		this.luck = 0; //Abbreviation of LUCK
		this.con = 1; //Abbreviation of CONSTITUTION
		this.res = 1; //Abbreviation of RESENTMENT
		this.insight = 1;
		this.breath = 1;
		this.stat_point = 15;

		this.lv = 1;
		this.hp = 1;
		this.mp = 0;
		this.exp = 0;
		this.sp = 5;
	}
	
	set_stat(type, val) {
		if (this[type] && typeof val === "number") {
			this[type] = val;
		} else {
			console.error(`Property ${type} does not exist on Player.`);
		}
	}
	
	get_core_stats() {
		const coreStat = {
			intel: this.intel,
			cha: this.charm,
			luck: this.luck,
			con: this.con,
			res: this.res,
			insight: this.insight,
			breath: this.breath,
			statPoint: this.stat_point
			
		};
		return coreStat;
	}
	
	get_ess_stat() {
		const ess_stat = {
			lv: this.lv,
			hp: this.hp,
			mp: this.mp,
			sp: this.skill_point
		};
		
		return this.ess_stat;
	}
};
