import { drawDot, 
    drawSquare
} from './helperFunctions.js';

export class Dice {
    constructor () {
        this.count = 1 + Math.floor(Math.random() * 6);
    }

    draw(x, y, r, lineWidth, fillColor, lineColor) {
        drawSquare(x, y, r, lineWidth, fillColor, lineColor);
        if (this.count === 1) {
            drawDot(x, y, r / 10, 'white');
        }
        if (this.count === 2) {
            drawDot(x + r / 4, y + r / 4, r / 10, 'white');
            drawDot(x - r / 4, y - r / 4, r / 10, 'white');
        }
        if (this.count === 3) {
            drawDot(x, y, r / 10, 'white');
            drawDot(x + r / 4, y + r / 4, r / 10, 'white');
            drawDot(x - r / 4, y - r / 4, r / 10, 'white');
        }
        if (this.count === 4) {
            drawDot(x + r / 4, y + r / 4, r / 10, 'white');
            drawDot(x - r / 4, y - r / 4, r / 10, 'white');
            drawDot(x - r / 4, y + r / 4, r / 10, 'white');
            drawDot(x + r / 4, y - r / 4, r / 10, 'white');
        }
        if (this.count === 5) {
            drawDot(x, y, r / 10, 'white');
            drawDot(x + r / 4, y + r / 4, r / 10, 'white');
            drawDot(x - r / 4, y - r / 4, r / 10, 'white');
            drawDot(x - r / 4, y + r / 4, r / 10, 'white');
            drawDot(x + r / 4, y - r / 4, r / 10, 'white');
        }
        if (this.count === 6) {
            drawDot(x + r / 4, y + r / 4, r / 10, 'white');
            drawDot(x - r / 4, y - r / 4, r / 10, 'white');
            drawDot(x - r / 4, y + r / 4, r / 10, 'white');
            drawDot(x + r / 4, y - r / 4, r / 10, 'white');
            drawDot(x - r / 4, y, r / 10, 'white');
            drawDot(x + r / 4, y, r / 10, 'white');
        }
    }
}