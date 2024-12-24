class Faction {
	constructor(id, name, description, alignment) {
		if (typeof id === "number" && id >= 0) this.id = id;
		if (typeof name === "string") this.name = name;
		if (typeof description === "string") this.description = description;
		if (typeof alignment === "number" 
			&& alignment < 6 && alignment > 0) this.alignment = alignment;
	}
	adjustAlignment(alignment) {
		if (typeof alignment === "number" 
			&& alignment < 6 && alignment > 0) this.alignment = alignment;
	}
};

const faction_fortunehall = new Faction(0, '尘缘堂', '遍布凡界的组织，专注将短暂平凡生活。', 5);
const faction_floralroom = new Faction(1, '醉花间', '维系凡界平和的组织。', 2);
const faction_nocontent = new Faction(2, '无内', '注重修心的宗派。', 3);
const faction_enlightgate = new Faction(3, '明道门', '钻研术法符箓，演算天机观星的法修宗派。', 4);
const faction_intercedepavillion = new Faction(4, '行天清阁', '悬壶济世的剑修宗派。', 1);
const faction_napsect = new Faction(5, '昼瞑宗', '器修宗派。', 3);

const allFactions = new Map([
					[faction_fortunehall.name, faction_fortunehall], 
					[faction_floralroom.name, faction_floralroom], 
					[faction_nocontent.name, faction_nocontent], 
					[faction_enlightgate.name, faction_enlightgate], 
					[faction_intercedepavillion.name, faction_intercedepavillion], 
					[faction_napsect.name, faction_napsect]]);

class FactionManager {
	constructor(joined_faction_name) {
		if (joined_faction_name === ('尘缘堂' || '醉花间' 
			|| '无内' || '明道门' || '行天清阁' || '昼瞑宗')) {
			this.joined_faction === allFactions.get(joined_faction_name);
		}
	}
	
	factionReputations() {
	
	}
	
	destroy() {
	}
};