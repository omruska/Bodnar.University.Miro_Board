const canvas = document.getElementById('whiteboard');
const ctx = canvas.getContext('2d');

let cellSize = 20; // Initial size of each cell in the grid
let zoomLevel = 1; // Initial zoom level
const maxZoom = 3; // Maximum allowed zoom level
const minZoom = 0.5; // Minimum allowed zoom level

// Function to draw the grid with the current cell size and offset
function drawGrid() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas
    const scaledCellSize = cellSize * zoomLevel; // Adjusted cell size based on zoom level

    for (let x = 0; x < canvas.width; x += scaledCellSize) {
        // Draw vertical lines
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.strokeStyle = '#ccc'; // Light gray color for grid lines
        ctx.stroke();
    }

    for (let y = 0; y < canvas.height; y += scaledCellSize) {
        // Draw horizontal lines
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.strokeStyle = '#ccc'; // Light gray color for grid lines
        ctx.stroke();
    }
}

// Function to handle mouse wheel zooming
function handleZoom(event) {
    const zoomSpeed = 0.1; // Zoom speed factor

    // Adjust zoom level based on mouse wheel direction
    if (event.deltaY < 0) {
        zoomLevel = Math.min(zoomLevel + zoomSpeed, maxZoom);
    } else {
        zoomLevel = Math.max(zoomLevel - zoomSpeed, minZoom);
    }

    // Redraw the grid with updated cell size
    drawGrid();
}

// Add event listener for mouse wheel to handle zooming
canvas.addEventListener('wheel', handleZoom);

// Draw the initial grid when the page loads
drawGrid();

// Function to handle adding text
function addText() {
    const text = prompt("Enter text:");
    if (text) {
        const x = 50; // Example position
        const y = 50; // Example position
        const fontSize = 16 / zoomLevel; // Adjust font size based on zoom level
        ctx.font = `${fontSize}px Arial`;
        ctx.fillText(text, x * zoomLevel, y * zoomLevel);
    }
}

// Function to handle adding sticky notes
function addStickyNote() {
    const note = prompt("Enter note:");
    if (note) {
        const x = 100; // Example position
        const y = 100; // Example position
        const width = 100; // Example width
        const height = 100; // Example height
        ctx.fillStyle = "#FFFFCC"; // Yellow color for sticky note
        ctx.fillRect(x * zoomLevel, y * zoomLevel, width * zoomLevel, height * zoomLevel);
        ctx.fillStyle = "#000"; // Reset color
        ctx.fillText(note, (x + 10) * zoomLevel, (y + 20) * zoomLevel); // Adjust text position
    }
}

// Function to handle adding rectangles
function addRectangle() {
    const x = 200; // Example position
    const y = 200; // Example position
    const width = 100; // Example width
    const height = 50; // Example height
    ctx.fillStyle = "#FF0000"; // Red color for rectangle
    ctx.fillRect(x * zoomLevel, y * zoomLevel, width * zoomLevel, height * zoomLevel);
}

// Function to handle adding circles
function addCircle() {
    const x = 300; // Example position
    const y = 300; // Example position
    const radius = 30; // Example radius
    ctx.beginPath();
    ctx.arc(x * zoomLevel, y * zoomLevel, radius * zoomLevel, 0, Math.PI * 2);
    ctx.fillStyle = "#00FF00"; // Green color for circle
    ctx.fill();
}

// Add event listeners for toolbar buttons
document.getElementById("addTextButton").addEventListener("click", addText);
document.getElementById("addStickyNoteButton").addEventListener("click", addStickyNote);
document.getElementById("addRectangleButton").addEventListener("click", addRectangle);
document.getElementById("addCircleButton").addEventListener("click", addCircle);