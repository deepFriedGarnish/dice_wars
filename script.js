const canvas = document.getElementById('myCanvas');
import { generateMap,
    getRandomHexColor,
    configureNeigboursForIslands,
    configureAllNeighbours,
    redrawMap
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
map = generateMap(polygonArr);
configureAllNeighbours();
redrawMap();
configureNeigboursForIslands(polygonArr);

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