const canvas = document.getElementById('myCanvas');
import { generateMap, 
    drawChunkSquare, 
    getRandomHexColor,
    configureNeigboursForIslands
} from './helperFunctions.js';
import { Chunk } from './Chunk.js';

canvas.width = 1000;
canvas.height = 700;

for (let i = 0; i < gridHeight; i++) {
    polygonArr[i] = new Array(gridWidth).fill(0);
}
// Set up the chunk matrix
for (let i = chunkSize / 2; i < canvas.width; i += chunkSize) {
    for (let j = chunkSize / 2; j < canvas.height; j += chunkSize) {
        chunkMap.set([i, j].join(':'), new Chunk());
    }
}

// Generate team colours
for (let i = 0; i < teamCount; i++) {
    teamColours.push(getRandomHexColor(i));
}

// Generate empty polygon array
const map = generateMap(polygonArr);

// Draw chunk grid
for (let i = 0; i < canvas.width; i += chunkSize){
    for (let j = 0; j < canvas.height; j += chunkSize){
        drawChunkSquare(i, j);
    }
}


for (let i = 0; i < map.length; i++){
    if (map[i] !== undefined){
        map[i].draw();
        map[i].configureNeigbours();
        map[i].drawOutlines();
    }
}

let lastChunkKey = `${chunkSize/2}:${chunkSize/2}`;
canvas.addEventListener('mousemove', (event) => {
    const mouseX = event.offsetX;
    const mouseY = event.offsetY;

    let gridMouseX = mouseX - (mouseX % chunkSize) + chunkSize / 2;
    let gridMouseY = mouseY - (mouseY % chunkSize) + chunkSize / 2;

    if (gridMouseX >= canvas.width) {
        gridMouseX = gridMouseX - (gridMouseX % chunkSize) - chunkSize / 2;
    }
    if (gridMouseY >= canvas.height) {
        gridMouseY = gridMouseY - (gridMouseY % chunkSize) - chunkSize / 2;
    }

    if (lastChunkKey !== [gridMouseX, gridMouseY].join(':')) {
        chunkMap.get(lastChunkKey).checkForHover(mouseX, mouseY);
        lastChunkKey = [gridMouseX, gridMouseY].join(':');
    }
    chunkMap.get([gridMouseX, gridMouseY].join(':')).checkForHover(mouseX, mouseY);
});

canvas.addEventListener("click", function(event) {
    const mouseX = event.offsetX;
    const mouseY = event.offsetY;

    let gridMouseX = mouseX - (mouseX % chunkSize) + chunkSize / 2;
    let gridMouseY = mouseY - (mouseY % chunkSize) + chunkSize / 2;

    if (gridMouseX >= canvas.width) {
        gridMouseX = gridMouseX - (gridMouseX % chunkSize) - chunkSize / 2;
    }
    if (gridMouseY >= canvas.height) {
        gridMouseY = gridMouseY - (gridMouseY % chunkSize) - chunkSize / 2;
    }

    chunkMap.get([gridMouseX, gridMouseY].join(':')).checkForClick();
});

console.log(chunkMap);   