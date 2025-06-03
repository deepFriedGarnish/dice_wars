const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');
import { Polygon } from './Polygon.js';
import { Island } from './Island.js';

export function drawDot(x, y, r) {
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2); // Draw a circle (dot)
    ctx.fillStyle = 'red'; // Set fill color to red
    ctx.fill(); // Fill the circle with the color
    ctx.closePath();
}

export function drawChunkSquare(x, y) {
    ctx.lineWidth = gridBorderSize - 3;
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x + chunkSize, y);
    ctx.lineTo(x + chunkSize, y + chunkSize);
    ctx.lineTo(x, y + chunkSize);
    ctx.closePath();
    ctx.stroke();
}

export function getRandomHexColor() {
    return '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0');
}

export function maxResolution() {
    const displayWidth = 725;
    const displayHeight = 500;
    const scale = window.devicePixelRatio || 1;
    canvas.width = displayWidth * scale;
    canvas.height = displayHeight * scale;
    canvas.style.width = displayWidth + 'px';
    canvas.style.height = displayHeight + 'px';
    ctx.scale(scale, scale);
}

export function generateMap(polygonArr) {
    let currentX = 0; // Current x position where a new poly is created
    let currentY = 0; // Current y position where a new poly is created
    let allIslands = []; // All islands in the map
    let currentIsland;

    // If islandCount = 3, then each team will have 3 islands each.
    for (let island = 0; island < islandCount; island++){
        // Go through each team to add a single island each.
        for (let team = 0; team < teamCount; team++) {
            currentIsland = [];
            // Create each polygon for a single island
            for (let i = 0; i < islandSize; i++) {
                if (polygonArr[currentY][currentX] === 0){
                    let newPolygon = new Polygon(
                        currentX * neighbourConstant + gridSize + offset, 
                        currentY * gridSize * 2 + gridSize + (currentX % 2 > 0 ? gridSize : 0) + offset,
                        gridSize,
                        team,
                        teamColours[team],
                    );
                    currentIsland.push(newPolygon);
                    polygonArr[currentY][currentX] = newPolygon;
                }
                const xDirection = Math.floor(Math.random() * 3) - 1;
                const yDirection = xDirection === 0 ? (Math.random() < 0.5 ? -1 : 1) : 0;
                
                if ((!(currentX + xDirection < 0)) && ((currentX + xDirection < gridWidth))) {
                    currentX += xDirection;
                }
                if ((!(currentY + yDirection < 0)) && ((currentY + yDirection < gridHeight))) {
                    currentY += yDirection;
                }
            }
            if (currentIsland.length !== 0){
                let headOfIsland = currentIsland[0];
                for (let j = 1; j < currentIsland.length; j++) {
                    headOfIsland.add(currentIsland[j]);
                }
                allIslands.push(new Island(headOfIsland));
            }
        }
    }
    return allIslands;
}