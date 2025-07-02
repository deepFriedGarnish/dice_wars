const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');

export class Polygon{
    constructor(id, x, y, r) {
        this.id = id;
        this.x = x;
        this.y = y;
        this.r = r;
        this.strokeColor = 'black';
        this.next = null;
        this.prev = null;
        this.neighbours = [];
        this.island = null;
    }

    // Draws the polygon inside on the canvas
    drawFill(color = this.island.teamColour) {
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.moveTo(this.x  - this.r/2, this.y - this.r);
        ctx.lineTo(this.x + this.r/2, this.y - this.r);
        ctx.lineTo(this.x + this.r, this.y);
        ctx.lineTo(this.x + this.r/2, this.y + this.r);
        ctx.lineTo(this.x - this.r/2, this.y + this.r);
        ctx.lineTo(this.x - this.r, this.y);
        ctx.fill();
        ctx.closePath();
    }

    // Draws a specified outline on the canvas
    drawOutline(type, color, margin = 0) {
        ctx.strokeStyle = color;
        ctx.lineWidth = gridBorderSize;
        ctx.beginPath();
        switch (type){
            case 'top-left':
                ctx.moveTo(this.x - gridSize - margin, this.y);
                ctx.lineTo(this.x - gridSize / 2, this.y - gridSize - margin);
                break;
            case 'top-right':
                ctx.moveTo(this.x + gridSize / 2, this.y - gridSize - margin);
                ctx.lineTo(this.x + gridSize + margin, this.y);
                break;
            case 'top':
                ctx.moveTo(this.x - gridSize / 2, this.y - gridSize - margin);
                ctx.lineTo(this.x + gridSize / 2, this.y - gridSize - margin);
                break;
            case 'bottom':
                ctx.moveTo(this.x - gridSize / 2, this.y + gridSize);
                ctx.lineTo(this.x + gridSize / 2, this.y + gridSize);
                break;
            case 'bottom-left':
                ctx.moveTo(this.x - gridSize, this.y);
                ctx.lineTo(this.x - gridSize / 2, this.y + gridSize);
                break;
            case 'bottom-right':
                ctx.moveTo(this.x + gridSize / 2, this.y + gridSize);
                ctx.lineTo(this.x + gridSize, this.y);
                break;
        };
        ctx.closePath();
        ctx.stroke();
    }

    add(polygon) {
        if (this.next === null) {
            let tempNode = polygon;
            tempNode.prev = this;
            this.next = tempNode;
        } else {
            this.next.add(polygon);
        }
    }

    drawOutlines(color = 'black', margin = 0) {
        let options = ['top', 'top-right', 'bottom-right', 'bottom', 'bottom-left', 'top-left'];
        for (let i = 0; i < options.length; i++) {
            if (this.neighbours.some(obj => obj.side === options[i])) {
                let index = options.indexOf(options[i]);
                options.splice(index, 1);
                i--;
            }
        }
        for (let i = 0; i < options.length; i++) {
            this.drawOutline(options[i], color, margin);
        }
    }
}