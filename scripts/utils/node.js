// scripts/utils/node.js

/** 
 * getNodeById - helper function to find a node by its ID 
 * @param given_nodes
 * @param {number} nodeId
 */
function getNodeById(given_nodes, nodeId) {
    return given_nodes.find(node => node.id === nodeId);
};

class NodeManager {
	constructor () {
		if (NodeManager.instance) {
			return NodeManager.instance;
		}
		this.loaded_nodes = null;
		this.current_node = null;
		this.dialog = [];
		this.current_nodeId = null;
		this.current_index = 0;
	}
	
	loadNode(nodes) {
		this.loaded_nodes = nodes;
	}
	
	startNode(start_nodeId) {
	  try {
		this.current_node = getNodeById(this.loaded_nodes, start_nodeId);
		this.current_nodeId = this.current_node.id;
		if (this.current_node.hasOwnProperty('condition')) {
			let condition = this.current_node.condition;
			//IF no condition exists for the start node
			if (condition === null) {
				//IF Dialog exists
				if (this.current_node.hasOwnProperty('dialogue')) {
				  this.dialog = this.current_node.dialogue;
				} else {
				  this.dialog = null;
				}
				this.current_index = 0;
			}
		}
	  } catch (error) {
		console.error("Error starting the node system:", error);
	  }
	}
	
	goToNextNode(nextnodeId) {
		if (nextnodeId !== this.current_nodeId) {
			this.startNode(nextnodeId);
		}
	}
	
	getCurrentNode() {
		return this.current_node;
	}
	
	getDialog() {
		return this.dialog;
	}
	
	resetCurrentIndex() {
		this.current_index = 0;
	}
	
	
	incCurrentIndex() {
		let index = this.current_index;
		if (this.dialog[index++]) {
			this.current_index++;
			return true;
		}
		this.resetCurrentIndex();
		return false;
	}
	
	
};

let nodeManager = new NodeManager();