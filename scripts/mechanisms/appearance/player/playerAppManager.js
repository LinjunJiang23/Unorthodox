// scripts/mechanisms/appearance/playerAppManager.js

class PlayerAppManager extends BaseAppManager {
	constructor(player) {
		super(player);
		this.hairStyle = 1;
		this.eyeShape = 1;
		this.hairColor = 1;
		this.eyeColor = 1;
		this.outfit = 1;
		this.accessory = 1;
		this.baseBody = 1;
		this.weapon = 1;
	}
	
	changeApp(type, num) {
		if (typeof num === "number" && num >= 1 && num <= 16) {
			switch (type) {
				case 'hairStyle':
					this.hairStyle = num;
					break;
				case 'hairColor':
					this.hairColor = num;
					break;
				case 'eyeShape':
					this.eyeShape = num;
					break;
				case 'eyeColor':
					this.eyeColor = num;
					break;
				case 'outfit':
					this.outfit = num;
					break;
				case 'accessory':
					this.accessory = num;
					break;
				case 'baseBody':
					this.baseBody = num;
					break;
				case 'weapon':
					this.weapon = num;
					break;
			}
		}
	}
};

