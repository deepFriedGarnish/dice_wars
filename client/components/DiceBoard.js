const canvas1 = document.getElementById('diceScreen1');
const ctx1 = canvas1.getContext('2d');
const canvas2 = document.getElementById('diceScreen2');
const ctx2 = canvas2.getContext('2d');

import { drawDot,
    drawSquare
} from '../utils/helperFunctions.js';

export class DiceBoard {
    constructor() {
        if (DiceBoard.instance) {
            return DiceBoard.instance;
        }
        DiceBoard.instance = this;
    }

    drawHoveredIslandDices() {
        let ctx = ctx1;
        let canvas = canvas1;
        if (selectedIsland !== null){
            ctx = ctx2;
            canvas = canvas2;
        }
        if (hoveredIsland !== null && selectedIsland !== hoveredIsland){
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            canvas.width = 450;
            canvas.height = 60;
            const startX = 30;
            const startY = 30;
            const r = 40;
            for (let i = 0; i < hoveredIsland.dices.length; i++) {
                let x = startX + i * r;
                let y = startY
                drawSquare(ctx, x, y, r, 1, hoveredIsland.teamColour, 'black');
                if (hoveredIsland.dices[i].count === 1) {
                    drawDot(ctx, x, y, r / 10, 'white');
                }
                if (hoveredIsland.dices[i].count === 2) {
                    drawDot(ctx, x + r / 4, y + r / 4, r / 10, 'white');
                    drawDot(ctx, x - r / 4, y - r / 4, r / 10, 'white');
                }
                if (hoveredIsland.dices[i].count === 3) {
                    drawDot(ctx, x, y, r / 10, 'white');
                    drawDot(ctx, x + r / 4, y + r / 4, r / 10, 'white');
                    drawDot(ctx, x - r / 4, y - r / 4, r / 10, 'white');
                }
                if (hoveredIsland.dices[i].count === 4) {
                    drawDot(ctx, x + r / 4, y + r / 4, r / 10, 'white');
                    drawDot(ctx, x - r / 4, y - r / 4, r / 10, 'white');
                    drawDot(ctx, x - r / 4, y + r / 4, r / 10, 'white');
                    drawDot(ctx, x + r / 4, y - r / 4, r / 10, 'white');
                }
                if (hoveredIsland.dices[i].count === 5) {
                    drawDot(ctx, x, y, r / 10, 'white');
                    drawDot(ctx, x + r / 4, y + r / 4, r / 10, 'white');
                    drawDot(ctx, x - r / 4, y - r / 4, r / 10, 'white');
                    drawDot(ctx, x - r / 4, y + r / 4, r / 10, 'white');
                    drawDot(ctx, x + r / 4, y - r / 4, r / 10, 'white');
                }
                if (hoveredIsland.dices[i].count === 6) {
                    drawDot(ctx, x + r / 4, y + r / 4, r / 10, 'white');
                    drawDot(ctx, x - r / 4, y - r / 4, r / 10, 'white');
                    drawDot(ctx, x - r / 4, y + r / 4, r / 10, 'white');
                    drawDot(ctx, x + r / 4, y - r / 4, r / 10, 'white');
                    drawDot(ctx, x - r / 4, y, r / 10, 'white');
                    drawDot(ctx, x + r / 4, y, r / 10, 'white');
                }
            }
        } else {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
        }
    }
}