const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');

import { drawDot, 
    drawSquare
} from '../utils/helperFunctions.js';

export class Dice {
    constructor () {
        this.count = 1 + Math.floor(Math.random() * 6);
    }

    draw(x, y, r, lineWidth, fillColor, lineColor) {
        drawSquare(ctx, x, y, r, lineWidth, fillColor, lineColor);
        if (this.count === 1) {
            drawDot(ctx, x, y, r / 10, 'white');
        }
        if (this.count === 2) {
            drawDot(ctx, x + r / 4, y + r / 4, r / 10, 'white');
            drawDot(ctx, x - r / 4, y - r / 4, r / 10, 'white');
        }
        if (this.count === 3) {
            drawDot(ctx, x, y, r / 10, 'white');
            drawDot(ctx, x + r / 4, y + r / 4, r / 10, 'white');
            drawDot(ctx, x - r / 4, y - r / 4, r / 10, 'white');
        }
        if (this.count === 4) {
            drawDot(ctx, x + r / 4, y + r / 4, r / 10, 'white');
            drawDot(ctx, x - r / 4, y - r / 4, r / 10, 'white');
            drawDot(ctx, x - r / 4, y + r / 4, r / 10, 'white');
            drawDot(ctx, x + r / 4, y - r / 4, r / 10, 'white');
        }
        if (this.count === 5) {
            drawDot(ctx, x, y, r / 10, 'white');
            drawDot(ctx, x + r / 4, y + r / 4, r / 10, 'white');
            drawDot(ctx, x - r / 4, y - r / 4, r / 10, 'white');
            drawDot(ctx, x - r / 4, y + r / 4, r / 10, 'white');
            drawDot(ctx, x + r / 4, y - r / 4, r / 10, 'white');
        }
        if (this.count === 6) {
            drawDot(ctx, x + r / 4, y + r / 4, r / 10, 'white');
            drawDot(ctx, x - r / 4, y - r / 4, r / 10, 'white');
            drawDot(ctx, x - r / 4, y + r / 4, r / 10, 'white');
            drawDot(ctx, x + r / 4, y - r / 4, r / 10, 'white');
            drawDot(ctx, x - r / 4, y, r / 10, 'white');
            drawDot(ctx, x + r / 4, y, r / 10, 'white');
        }
    }
}