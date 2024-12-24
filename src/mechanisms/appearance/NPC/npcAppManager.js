// scripts/mechanisms/appearance/npcAppManager.js

class NPCAppManager extends BaseAppManager {
	constructor(companion) {
		super(companion);
		this.outfit = 1;
		this.accessory = 1;
	}
	
	changeApp(type, num) {
		if (typeof num === "number" && num >= 1 && num <= 16) {
			switch (type) {
				case 'outfit':
					this.outfit = num;
					break;
				case 'accessory':
					this.accessory = num;
					break;
			}
		}
	}
};