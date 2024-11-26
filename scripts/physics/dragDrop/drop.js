/* DROP LOGIC
	1. Do not highlight interactive targets to increase immersive experience
	2. If target is not valid, will have feedback.
	3. NPC should react to:
		a). Item being dragged out in front of them
		b). Item hovering over them
		c). Item being dropped on them
 */

// DROP ITEM ON BLACKSMITH
    $(document).on('drop', '#blacksmith', function (event) {
            const interactionMessage = $('#interaction-message');

		event.preventDefault();
        const draggedItemId = event.originalEvent.dataTransfer.getData("text/plain");

        if (draggedItemId === "sword") {
            interactionMessage.text("The Blacksmith inspects the Ancient Sword and offers 200 gold!");
        } else {
            interactionMessage.text("Nothing happens...");
        }
    });