/* DRAG LOGIC
	1. When dragged, the item becomes slightly transparent
	2. Item stay attched to the hand cursor
	3. Snap behavior: Should snap to grid points
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
});


function dragStart(event) {
	
};