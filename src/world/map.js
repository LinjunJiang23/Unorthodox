// scripts/mechanisms/worldSetUp/map.js

class MapElement {
    constructor(name, description, type, is_unlocked = false) {
        if (typeof name === "string") this.name = name;
        if (typeof description === "string") this.description = description;
		this.is_unlocked = is_unlocked;
    }
	
	getDescription() {
		return this.description;
	}

    unlock() {
        this.is_unlocked = true;
    }

    lock() {
        this.is_unlocked = false;
    }

    isUnlocked() {
        return this.is_unlocked;
    }
};
	
class Realm extends MapElement {
	constructor(name, description, is_unlocked = false) {
		super(name, description, is_unlocked);
		this.sub_elements = new Map();
	}

	addSubElement(sub_element) {
		if (sub_element instanceof MapElement) {
			this.sub_elements.set(sub_element.name, sub_element);
		}
	}
	
	listSubElements() {
		return this.sub_elements;
	}
};
	
class Location extends Realm {
	constructor(name, description, is_unlocked = false) {
		super(name, description, is_unlocked);
		this.connection = new Map();
	}
	
	addConnection(new_location, distance) {
		if (new_location !== this && new_location instanceof MapElement) {
			this.connection.set(new_location.name, distance);
			new_location.connection.set(this.name, distance);
		}
	}
	
	listConnection() {
		return this.connection;
	}
	
	distanceTo(connect) {
	  if (this.connection.has(connect.name)) {
		return this.connection.get(connect.name);
	  } else {
		return `${connect.name} is not connected to ${this.name}.`;
	  }
	}
};

class InteractivePoint extends Location {
	constructor(name, description, is_unlocked = false) {
		super(name, description, is_unlocked);
		this.can_fast_travel = false;
	}
	
	canFT() {
		return this.can_fast_travel;
	}
	
	enableFT() {
		this.can_fast_travel = true;
	}
	
	disableFT() {
		this.can_fast_travel = false;
	}
};
	
class WorldMap {
	constructor() {
		if(WorldMap.instance) {
			return WorldMap.instance;
		}
		this.realms = new Map();
		this.current_location = null;
		this.current_point = null;
		this.current_realm = null;
	}
	
	addRealm(new_realm) {
		if (new_realm instanceof Realm) {
			this.realms.set(new_realm.name, new_realm);
		}
	}
	
	getRealms() {
		return this.realms;
	}
	
	travelTo(element_name) {
		if (this.realms.has(element_name) && this.realms.get(element_name).isUnlocked()) {
			this.current_realm = this.realms.get(element_name);
			this.current_location = null;
			this.current_point = null;
			console.log(`Element found, current realm recorded is: ${this.current_realm.name}.`);
			return;
		} 
		
		for (let [realm_name, realm] of this.realms) {
			if (realm.sub_elements.has(element_name)) {
				let loc = realm.sub_elements.get(element_name);
				if (loc.isUnlocked()) {
					this.current_realm = realm;
					this.current_location = realm.sub_elements.get(element_name);
					this.current_point = null;
					console.log(`Element found, current realm recorded is: 
					${this.current_realm.name}, current location recorded is: ${this.current_location.name}.`);
					return;
				}
			}
				
			for (let [loc_name, loc] of realm.sub_elements) {
				if (loc.sub_elements.has(element_name)) {
					let point = loc.sub_elements.get(element_name);
					if (point.isUnlocked()) {
						this.current_realm = realm;
						this.current_location = loc;
						this.current_point = loc.sub_elements.get(element_name);
						console.log(`Element found, current realm recorded is: 
						${this.current_realm.name}, current location recorded is: ${this.current_location.name},
						current interactive point is: ${this.current_point.name}.`);
						return;
					  }
				}
			}					
		}
		console.error('error travelling');
	}			
	
	fastTravel(interactive_point) {
		if (interactive_point instanceof InteractivePoint && 
		    interactive_point.isUnlocked() && 
			interactive_point.canFT()) {
				
			this.current_point = interactive_point;
						
			this.realms.forEach((realm, realm_name) => {
              realm.sub_elements.forEach((loc, loc_name) => {
                if (loc.sub_elements && loc.sub_elements.has(interactive_point.name) && 
                    loc.isUnlocked() && realm.isUnlocked()) {
                    this.current_realm = realm;
                    this.current_location = loc;
                    console.log(`Fast traveled to ${interactive_point.name} in ${loc_name}, ${realm_name}.`);
                    return;
                }
			  });
			});
		} else if (!(interactive_point instanceof InteractivePoint)) {
			console.error('Interactive point not found.');
		} else {
			if (!interactive_point.isUnlocked()) {
				console.error('Point locked.');
			}
			if (!interactive_point.canFT()) {
				console.error('Fast travel not enabled at this point.');
			}
		}
    }
	
	getCurrentPoint() {
		let content = {
			realm: this.current_realm,
			location: this.current_location,
			point: this.current_point
		};
		return content;
	}
	
	
};
	

//人界：崂山，麟海
//崂山：荣城，林海镇
//林海镇：醉花间
//麟海：
//太虚山脉:旗岭，雾林，混天门，魔域
//旗岭：山巅
//雾林：石林、森林
//魔域:结界 

// Areas
let location_laorange = new Location('崂山', '适宜居住的低矮山峦');
let location_lingocean = new Location('麟海', '一望无际的海洋');
let location_qimountain = new Location('旗岭', '高耸入云天的山脉');
let location_foggyforest = new Location('雾林', '幽深的雾蒙深林');

//Locations
let point_rongcity = new InteractivePoint('荣城', '繁华的城池');
let point_linghaitown = new InteractivePoint('林海镇', '宁静的小镇');
let point_xingtianpeak = new InteractivePoint('行天巅', '白雪皑皑的山巅');
let point_stonewood = new InteractivePoint('石林', '岩洞遍布的洞天');
let point_darkwood = new InteractivePoint('深林', '黑暗的森林');
//Realms
let realm_common = new Realm('人界', '凡人居住地');
let realm_taixu = new Realm('太虚', '修仙者居住地');
let realm_demonic = new Realm('魔域', '魔修与魔物盘踞于此');
//WorldMap