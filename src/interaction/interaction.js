// src/interaction/interactionSystem.js


class InteractionSystem {
	constructor(eventManager) {
		this.eventManager = eventManager;
	}
	
	parse_interaction_menu(interactions) {
		interactions.forEach(interaction => {
			const condition = interaction.condition;
			const menuOptions = {};
			let result;
			if (interaction.condition) {
				result = this.eventManager.logic.conditionManager.parse_conditions(interaction.condition);
				if (result) {
					menuOptions[interaction.id].text = interaction.text;
					if (interaction.action) this.eventManager.trigger('triggerAction', {action: interaction.action});
					if (interaction.next_node) menuOptions[interaction.id].next_node = interaction.next_node;
				}
			} else {
				menuOptions[interaction.id].text = interaction.text;
				if (interaction.next_node) menuOptions[interaction.id].next_node = interaction.next_node;
			}
		});
	}
	build_interaction_menu() {
		
		
	}
	
	trigger_interaction_menu(id) {
	
	}
	
	
};