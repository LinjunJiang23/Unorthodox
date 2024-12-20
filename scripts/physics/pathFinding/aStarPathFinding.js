// scripts/physics/pathFinding/aStarpathFinding.js

/**
 * This pathfinding logic is based on A* algorithm. When NPC is in static environment e.g. town, 
 * they use this pathfinder instead of D* pathfinder
 * @class
 * @summary Pathfinding logic that uses A* algorithm  
 */
class AStarPathFinding {
	
	/**
	 * @constructor
	 * @property {Function} heuristic
	 * @property {Function} getNeighbors
	 */
	constructor() {
	}
	
	/**
	 * Simple Euclidean Distance Formula for heuristic calculation
	 */
	heuristic(currentP, destinationP) {
	  let dx = Math.abs(currentP.x - destinationP.x);
	  let dy = Math.abs(currentP.y - destinationP.y);
	
	  let h = Math.sqrt(dx * dx + dy * dy);
	  return h;
	}
	
	/**
	 * Simple function to calculate neighbors for 8 directions
	 */
	getNeighbors(point) {
		//Avoid out of bound neighbors
		let negX = (point.x - 1 < 0) ? 0 : point.x - 1;
		let negY = (point.y - 1 < 0) ? 0 : point.y - 1;
		const diagonalC = Math.sqrt(2);
		const neighbors = [
			{ x: point.x + 1, y: point.y + 1}, //Southeast
			{ x: negX, y: point.y + 1}, //Southwest
			{ x: point.x + 1, y: negY}, //Northeast
			{ x: negX, y: negY}, //Northwest
			{ x: point.x + 1, y: point.y},	//East
			{ x: negX, y: point.y}, //West
			{ x: point.x, y: point.y + 1}, //South
			{ x: point.x, y: negY} //North
			
		];		
		/** 
		@todo filter obstacles in the map, 
		should implement location system first in order to read specific map information.
		*/
		
		return neighbors;
	}
	
	/**
	 * Reconstrct path 
	 */
	reconstructPath(cameFrom, current) {
		const path = [];
		
		while (current) {			
			path.unshift(current);
			current = cameFrom[`${current.x},${current.y}`];
		}

		return path;
	}
	
	/**
	 * @property aStar
	 */
	aStar(start, target) {
		
		const gScore = {}; //Cost to move from starting point to a node
		const fScore = {}; //Estimated cost to move from this node to target

		const openList = [start]; // Nodes sorted by their f value
		const closedlist = [];  //Nodes already evaluated and will not be revisited
		const cameFrom = {};
				
		const key = point => `${point.x},${point.y}`;		
		gScore[key(start)] = 0;
		fScore[key(start)] = this.heuristic(start, target);
		
		while (openList.length > 0) {
			const current = openList.reduce((lowest, node) => 
				fScore[key(node)] < fScore[key(lowest)] ? node : lowest
			);
			
			if (current.x === target.x && current.y === target.y) {
				return this.reconstructPath(cameFrom, current);
			}
			
			openList.splice(openList.indexOf(current), 1);
			closedlist.push(current);
			
			for (const neighbor of this.getNeighbors(current)) {
				if (closedlist.some(node => (node.x === neighbor.x && node.y === neighbor.y))) continue;
				
				const tentativeGScore = gScore[key(current)] + this.heuristic(current, neighbor);
				
				if (!openList.some(node => (node.x === neighbor.x && node.y === neighbor.y))) {
					openList.push(neighbor);
				} else if (tentativeGScore >= gScore[key(neighbor)]) {
					continue;
				}
					
				cameFrom[key(neighbor)] = current;
				gScore[key(neighbor)] = tentativeGScore;
				fScore[key(neighbor)] = gScore[key(neighbor)] + this.heuristic(neighbor, target);
			}
		}
		return [];
	}
};