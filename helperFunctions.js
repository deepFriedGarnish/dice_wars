const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');
import { Polygon } from './Polygon.js';
import { Island } from './Island.js';

export function drawDot(x, y, r, color) {
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2); // Draw a circle (dot)
    ctx.fillStyle = color; // Set fill color to red
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

export function drawSquare(x, y, r, lineWidth, fillColor, lineColor) {
    ctx.lineWidth = lineWidth;
    ctx.fillStyle = fillColor;
    ctx.strokeStyle = lineColor;
    ctx.beginPath();
    ctx.moveTo(x - r/2, y - r/2);
    ctx.lineTo(x + r/2, y - r/2);
    ctx.lineTo(x + r/2, y + r/2);
    ctx.lineTo(x - r/2, y + r/2);
    ctx.fill();
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
                        gridSize
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
                allIslands.push(new Island(headOfIsland, team, teamColours[team]));
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
                                    if (!polygonArr[y][x].island.neighbourIslands.some(island => island === polygonArr[posY][posX].island)) {
                                        polygonArr[y][x].island.neighbourIslands.push(polygonArr[posY][posX].island);
                                        continue;
                                    }
                                    if (!polygonArr[posY][posX].island.neighbourIslands.some(island => island === polygonArr[y][x].island)) {
                                        polygonArr[posY][posX].island.neighbourIslands.push(polygonArr[y][x].island);
                                        continue;
                                    }
                                }
                            }
                        }
                    }
                }
            } else {
                // Check every posible direction
                for (let dirX = 0; dirX < directions.length; dirX++) {
                    for (let dirY = 0; dirY < directions.length; dirY++) {
                        const xDir = directions[dirX];
                        const yDir = directions[dirY];
                        // Skip (0;0), (-1;-1) and (1;-1), because these positions are 
                        // irrelevant for ODD column polygons 
                        if (!(xDir === 0 && yDir === 0) &&
                        !(xDir === -1 && yDir === -1) &&
                        !(xDir === 1 && yDir === -1)) {
                            // If checked position is in bounds
                            const posX = x + xDir;
                            const posY = y + yDir;
                            if ((posX >= 0 && posX < polygonArr[y].length) &&
                                ((posY >= 0 && posY < polygonArr.length))) {
                                // Check if the neighbour is not an empty place
                                if (polygonArr[posY][posX] !== 0) {
                                    if (!polygonArr[y][x].island.neighbourIslands.some(island => island === polygonArr[posY][posX].island)) {
                                        polygonArr[y][x].island.neighbourIslands.push(polygonArr[posY][posX].island);
                                    }
                                    if (!polygonArr[posY][posX].island.neighbourIslands.some(island => island === polygonArr[y][x].island)) {
                                        polygonArr[posY][posX].island.neighbourIslands.push(polygonArr[y][x].island);
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}

export function changeHex(color, amount = 20) {
    // Remove # if present
    let hex = color.replace(/^#/, '');

    // Parse r, g, b values
    let r = parseInt(hex.substring(0, 2), 16);
    let g = parseInt(hex.substring(2, 4), 16);
    let b = parseInt(hex.substring(4, 6), 16);

    
    
    // Subtract amount, clamp to 0
    r = Math.max(0, r + amount);
    g = Math.max(0, g + amount);
    b = Math.max(0, b + amount);

    if (r > 254) {
        r = 254;
    }
    if (g > 254) {
        g = 254;
    }
    if (b > 254) {
        b = 254;
    }
    
    // Convert back to hex and pad with 0 if needed
    const toHex = (c) => c.toString(16).padStart(2, '0');

    return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

export function redrawMap() {
    for (let i = 0; i < canvas.width; i += chunkSize){
        for (let j = 0; j < canvas.height; j += chunkSize){
            drawSquare(i + chunkSize / 2, j + chunkSize / 2, chunkSize, 2, 'white', 'gray');
        }
    }
    for (let i = 0; i < map.length; i++){
        if (map[i] !== undefined){
            map[i].draw();
            map[i].drawOutlines();
        }
    }

    for (let i = 0; i < map.length; i++){
        if (map[i] !== undefined){
            map[i].drawDices();
        }
    }
}

export function configureAllNeighbours() {
    for (let i = 0; i < map.length; i++){
        if (map[i] !== undefined){
            map[i].configureNeigbours();
        }
    }
}