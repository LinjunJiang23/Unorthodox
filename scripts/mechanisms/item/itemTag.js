// scripts/mechanisms/item/itemTag.js


/**
 * used to filter item
 */
class ItemTag {
	/**
	 * construct a item tag
	 * @param {string} name
	 * @param {string} description 
	 * @param {string} tag_color - format: #FFFFFF
	 */
	constructor(name, description, tag_color) {
		if (typeof name === "string") this.name = name;
		if (typeof description === "string") this.description = description;
		if (typeof tag_color === "string" && 
		tag_color.startsWith('#') && tag_color.length == 7) {
			
			let validHex = true;
			
			for (let i = 1; i < 7; i++) {
			  if (!((tag_color[i] <= '9' && tag_color[i] >= '0') || 
					(tag_color[i] <= 'F' && tag_color[i] >= 'A'))) {
					console.log("Tag color not in HEX format, needs either capital characters or numbers.");
					validHex = false;
					break;
				}
			};
			if (validHex) this.tag_color = tag_color;
		} else {
			console.log("Tag_color not in HEX format, e.g., #000000");
		}
	}
	
	// Start of SETTERs
	setName(name) {
		if (typeof name === "string") this.name = name;
	}
	
	setDescription(description) {
		if (typeof description === "string") this.description = description;
	}
	// End of SETTERs
	
	// Start of GETTERs
	getDescription() {
		return this.description;
	}
	
	getTagColor() {
		return this.tag_color;
	}
	// End of GETTERs
};


const tag_consumable = new ItemTag('可食用', "能被普罗大众享用", '#FFFFFF');
const tag_quest = new ItemTag('任务道具', '完成委托所需的重要物', '#F0D00F');
const tag_weapon = new ItemTag('武器', '具有一定杀伤力的道具', '#F00F2A');
const tag_abnormal = new ItemTag('非凡', '充满超脱的奥妙', '#65F072');
const tag_usable = new ItemTag('可使用', '能被你“食”用', '#FFFFFF');
const tag_materials = new ItemTag('材料', '构建用材料', '#C70039');

const existing_tags = [tag_consumable, tag_quest, tag_weapon, tag_abnormal, 
tag_usable, tag_materials];