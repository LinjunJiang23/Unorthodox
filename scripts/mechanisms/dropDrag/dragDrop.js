/* DRAG LOGIC
	1. When dragged, the item becomes slightly transparent
	2. Item stay attched to the hand cursor
	3. Snap behavior: Should snap to grid points
 */

/* DROP LOGIC
	1. Do not highlight interactive targets to increase immersive experience
	2. If target is not valid, will have feedback.
	3. NPC should react to:
		a). Item being dragged out in front of them
		b). Item hovering over them
		c). Item being dropped on them
 */
$(document).ready(function () {
    const interactionMessage = $('#interaction-message');

    // DRAG START
    $(document).on('dragstart', '#sword', function (event) {
        event.originalEvent.dataTransfer.setData("text/plain", event.target.id);
        $(this).addClass('dragging');
    });

    // DRAG OVER BLACKSMITH
    $(document).on('dragover', '#blacksmith', function (event) {
        event.preventDefault(); // Required to allow drop
		const draggedItemId = event.originalEvent.dataTransfer.getData("text/plain");

        if (draggedItemId === "sword") {
            interactionMessage.text("The Blacksmith inspects the Ancient Sword and offers 200 gold!");
		}
    });

    // DRAG LEAVE BLACKSMITH
    $(document).on('dragleave', '#blacksmith', function () {
		interactionMessage.text("Nothing happens...");
    });

    // DROP ITEM ON BLACKSMITH
    $(document).on('drop', '#blacksmith', function (event) {
        event.preventDefault();
        const draggedItemId = event.originalEvent.dataTransfer.getData("text/plain");

        if (draggedItemId === "sword") {
            interactionMessage.text("The Blacksmith inspects the Ancient Sword and offers 200 gold!");
        } else {
            interactionMessage.text("Nothing happens...");
        }
    });
});
