// scripts/mechanisms/NPC/pathFinding.js

/**
 * PathFinding - class that mainly uses A* algorithm
 */
class PathFinding {
	/**
	 * @constructor
	 * @param {string} type
	 */
	constructor(type = 'neutral') {
		if (PathFinding.validTypes.includes(type)) this.type = type;
		this.currentEnv;
	}
	
	/**
	 * @property heuristic - uses Diagnonal Distance 
	 */
	heuristic(currentP, destinationP) {
	  let dx = Math.abs(currentP.x - destinationP.x);
	  let dy = Math.abs(currentP.y - destinationP.y);
	
	  let d = Math.sqrt(2) - 2;
	
	  let h = dx + dy + d * Math.min(dx, dy);
	  return h;
	}
	
	/**
	 * @property distance - Manhattan distance
	 */
	distance(pointA, pointB) {
        return Math.abs(pointA.x - pointB.x) + Math.abs(pointA.y - pointB.y);
	}
	
	/**
	 * @property getNeighbors
	 */
	getNeighbors(point) {
		
	}
	
	/**
	 * @property reconstructPaths
	 */
	reconstructPath(cameFrom, current) {
		const path = [current];
		while (cameFrom[current]) {
			current = cameFrom[current];
			path.unshift(current);
		}
		return path;
	}
	
	/**
	 * @property aStart
	 */
	aStar(start, target) {
		let openList = [start];
		let closedList = [];
		let cameFrom = {};
		
		let gScore = {};
		let fScore = {};
		
		gScore[start] = 0;
		fScore[start] = this.heuristic(start, target);
		
		while (openList.length > 0) {
			const current = openList.reduce((lowest, node) => 
				fScore[node] < fScore[lowest] ? node : lowest
			);
			
			if (current === target) {
				return this.reconstructPath(cameFrom, current);
			}
			
			openList.splice(openList.indexOf(current), 1);
			closedList.push(current);
			
			for (const neighbor of this.getNeighbors(current)) {
				for (const neighbor of this.getNeighbors(current)) {
					if (closedList.includes(neighbor)) continue;
					
					const tentativeGScore = gScore[current] + this.distance(current, neighbor);
					
					if (!openList.includes(neighbor)) {
						openList.push(neighbor);
					} else if (tentativeGScore >= gScore[neighbor]) {
						continue;
					}
					
					cameFrom[neighbor] = current;
					gScore[neighbor] = tentativeGScore;
					fScore[neighbor] = gScore[neighbor] + this.heuristic(neighbor, target);
				}
				return [];
			}
		}
	}
	
	
	
};