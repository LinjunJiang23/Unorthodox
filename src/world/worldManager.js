class WorldManager {
	constructor(engine) {
		this.engine = engine;
		this.partitions = [];
	}
	
	get_active_partitions(point, viewportWidth = 16, viewportHeight = 16) {
		const startSectionX = Math.floor((point.x / 16) / this.env.sectionWidth) - 1;
		const startSectionY = Math.floor((point.y / 16) / this.env.sectionHeight) - 1;
		const endSectionX = Math.floor(((point.x / 16) + viewportWidth) / this.env.sectionWidth) - 1;
		const endSectionY = Math.floor(((point.y / 16) + viewportHeight) / this.env.sectionHeight) - 1;
		
		
		const activeSections = [];
		for (let y = startSectionY; y <= endSectionY; y++) {
			for (let x = startSectionX; x<= endSectionX; x++) {
				const section = this.env.getSection(x, y);
				if (section) {
					activeSections.push(section);
				}
			}
		}
		
		return activeSections;
	}
};