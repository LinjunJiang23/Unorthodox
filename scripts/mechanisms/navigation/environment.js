setTimeout(() => { const canvas = document.getElementById('gameCanvas');
    const ctx = canvas.getContext('2d');

    // Environment elements
    const environmentElements = [
        { x: 100, y: 100, width: 100, height: 100, color: 'green', interactable: true },
        { x: 500, y: 100, width: 100, height: 100, color: 'blue', interactable: true }
    ];

    // Draggable items
    const items = [
        { x: 50, y: 400, width: 50, height: 50, color: 'red', dragging: false },
        { x: 200, y: 400, width: 50, height: 50, color: 'yellow', dragging: false }
    ];

    let draggingItem = null;
    let offsetX, offsetY;

    // Draw function to render environment elements and items
    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Draw environment elements
        environmentElements.forEach(element => {
            ctx.fillStyle = element.color;
            ctx.fillRect(element.x, element.y, element.width, element.height);
        });

        // Draw draggable items
        items.forEach(item => {
            ctx.fillStyle = item.color;
            ctx.fillRect(item.x, item.y, item.width, item.height);
        });
    }

    // Mouse down event to start dragging
    canvas.addEventListener('mousedown', function (e) {
        const mousePos = getMousePos(canvas, e);

        // Check if an item is clicked
        items.forEach(item => {
            if (isMouseOver(mousePos, item)) {
                draggingItem = item;
                offsetX = mousePos.x - item.x;
                offsetY = mousePos.y - item.y;
                item.dragging = true;
            }
        });
    });

    // Mouse move event to drag items
    canvas.addEventListener('mousemove', function (e) {
        if (draggingItem) {
            const mousePos = getMousePos(canvas, e);
            draggingItem.x = mousePos.x - offsetX;
            draggingItem.y = mousePos.y - offsetY;
            draw();
        }
    });

    // Mouse up event to drop items
    canvas.addEventListener('mouseup', function () {
        if (draggingItem) {
            // Check if the item is dropped on an interactable environment element
            environmentElements.forEach(element => {
                if (isOverlapping(draggingItem, element) && element.interactable) {
                    // Change the color of the element when an item is dropped on it
                    element.color = draggingItem.color;
                }
            });

            // Stop dragging
            draggingItem.dragging = false;
            draggingItem = null;
            draw();
        }
    });

    // Utility function to get mouse position
    function getMousePos(canvas, evt) {
        const rect = canvas.getBoundingClientRect();
        return {
            x: evt.clientX - rect.left,
            y: evt.clientY - rect.top
        };
    }

    // Utility function to check if the mouse is over an item
    function isMouseOver(mousePos, item) {
        return mousePos.x > item.x && mousePos.x < item.x + item.width &&
               mousePos.y > item.y && mousePos.y < item.y + item.height;
    }

    // Utility function to check if two objects are overlapping
    function isOverlapping(item, element) {
        return item.x < element.x + element.width &&
               item.x + item.width > element.x &&
               item.y < element.y + element.height &&
               item.y + item.height > element.y;
    }

    // Initial draw call
    draw();
    }, 40);