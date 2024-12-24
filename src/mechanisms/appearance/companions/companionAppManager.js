// scripts/mechanisms/appearance/companionAppManager.js

class CompanionAppManager extends BaseAppManager {
	constructor(companion) {
		super(companion);
		this.hairStyle = 1;
		this.outfit = 1;
		this.accessory = 1;
		this.weapon = 1;
	}
	
	changeApp(type, num) {
		if (typeof num === "number" && num >= 1 && num <= 16) {
			switch (type) {
				case 'hairStyle':
					this.hairStyle = num;
					break;
				case 'outfit':
					this.outfit = num;
					break;
				case 'accessory':
					this.accessory = num;
					break;
				case 'weapon':
					this.weapon = num;
					break;
			}
		}
	}
};

