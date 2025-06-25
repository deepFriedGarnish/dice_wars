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
    ctx.strokeStyle = 'gray';
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
    const displayWidth = canvas.width;
    const displayHeight = canvas.height;
    const scale = window.devicePixelRatio || 1;
    canvas.width = displayWidth * scale;
    canvas.height = displayHeight * scale;
    canvas.style.width = displayWidth + 'px';
    canvas.style.height = displayHeight + 'px';
    ctx.scale(scale, scale);
}

// Generates the map. Creates an array of all the islands
export function generateMap(polygonArr) {
    let currentX = 0; // Current x position where a new poly is created
    let currentY = 0; // Current y position where a new poly is created
    let allIslands = []; // All islands in the map
    let currentIsland;
    let currentId = 1;

    // If islandCount = 3, then each team will have 3 islands each.
    for (let island = 0; island < islandCount; island++){
        // Go through each team to add a single island each.
        for (let team = 0; team < teamCount; team++) {
            currentIsland = [];
            // Create each polygon for a single island
            for (let i = 0; i < islandSize; i++) {
                if (polygonArr[currentY][currentX] === 0){
                    let newPolygon = new Polygon(
                        currentId,
                        currentX * neighbourConstant + gridSize + offset, 
                        currentY * gridSize * 2 + gridSize + (currentX % 2 > 0 ? gridSize : 0) + offset,
                        gridSize,
                        team,
                        teamColours[team],
                    );
                    currentIsland.push(newPolygon);
                    polygonArr[currentY][currentX] = newPolygon;
                    currentId += 1;
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

export function configureNeigboursForIslands(polygonArr) {
    let directions = [-1, 0, 1];

    // Go through each row
    for (let y = 0; y < polygonArr.length; y++) {
        // Go through each column
        for (let x = 0; x < polygonArr[y].length; x++) {
            if (polygonArr[y][x] === 0) {
                continue;
            }
            // Check if the column is even (the neighbours depend on it)
            if (x % 2 === 0) {
                // Check every posible direction
                for (let dirX = 0; dirX < directions.length; dirX++) {
                    for (let dirY = 0; dirY < directions.length; dirY++) {
                        const xDir = directions[dirX];
                        const yDir = directions[dirY];
                        // Skip (0;0), (-1;1) and (1;1), because these positions are 
                        // irrelevant for EVEN column polygons 
                        if (!(xDir === 0 && yDir === 0) &&
                            !(xDir === -1 && yDir === 1) &&
                            !(xDir === 1 && yDir === 1)) {
                            // If checked position is in bounds
                            const posX = x + xDir;
                            const posY = y + yDir;
                            if ((posX >= 0 && posX < polygonArr[y].length) &&
                                ((posY >= 0 && posY < polygonArr.length))) {
                                // Check if the neighbour is not an empty place
                                if (polygonArr[posY][posX] !== 0) {
                                    // Check if the neighbours team doesn't mach
                                    if (polygonArr[y][x].team !== polygonArr[posY][posX].team) {
                                        if (!polygonArr[y][x].island.neighbourIslands.some(island => island === polygonArr[posY][posX])) {
                                            polygonArr[x][y].island.neighbourIslands.push(polygonArr[posY][posX].island);
                                        }
                                        if (!polygonArr[posY][posX].island.neighbourIslands.some(island => island === polygonArr[y][x])) {
                                            polygonArr[posY][posX].island.neighbourIslands.push(polygonArr[y][x].island);
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            } else {

            }
        }
    }
}