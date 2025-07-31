const canvas = document.getElementById('myCanvas');
import { generateMap,
    getRandomHexColor,
    configureNeigboursForIslands,
    configureAllNeighbours,
    redrawMap,
    handleIslandSelection,
    handleIslandHover,
    handleIslandAttack
} from './utils/helperFunctions.js';
import { Chunk } from './components/Chunk.js';
import { DiceBoard } from './components/DiceBoard.js';

const diceBoard = new DiceBoard();

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
    diceBoard.drawHoveredIslandDices();

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
    
    handleIslandHover(lastChunkKey, mouseX, mouseY);

    if (lastChunkKey !== [gridMouseX, gridMouseY].join(':')) {
        lastChunkKey = [gridMouseX, gridMouseY].join(':');
    }
});

canvas.addEventListener("click", function(event) {
    diceBoard.drawHoveredIslandDices();
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

    const chunkKey = [gridMouseX, gridMouseY].join(':');
    handleIslandSelection(chunkKey);
    handleIslandAttack();
});