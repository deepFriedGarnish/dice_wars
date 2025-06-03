const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');

export class Polygon{
    constructor(x, y, r, team, teamColor) {
        this.x = x;
        this.y = y;
        this.r = r;
        this.strokeColor = 'black';
        this.team = team;
        this.teamColor = teamColor;
        this.next = null;
        this.prev = null;
        this.neighbours = [];
        this.island = null;
    }

    // Draws the polygon inside on the canvas
    drawFill(color = this.teamColor) {
        ctx.fillStyle = color;
        ctx.strokeColor = this.strokeColor;
        ctx.lineWidth = this.lineWidth;
        ctx.beginPath();
        ctx.moveTo(this.x  - this.r/2 + offset, this.y - this.r + offset);
        ctx.lineTo(this.x + this.r/2 + offset, this.y - this.r + offset);
        ctx.lineTo(this.x + this.r + offset, this.y + offset);
        ctx.lineTo(this.x + this.r/2 + offset, this.y + this.r + offset);
        ctx.lineTo(this.x - this.r/2 + offset, this.y + this.r + offset);
        ctx.lineTo(this.x - this.r + offset, this.y + offset);
        ctx.closePath();
        ctx.fill();
    }

    // Draws a specified outline on the canvas
    drawOutline(type) {
        ctx.beginPath();
        ctx.lineWidth = gridBorderSize;
        switch (type){
            case 'top-left':
                ctx.moveTo(this.x - gridSize + offset, this.y + offset);
                ctx.lineTo(this.x - gridSize / 2 + offset, this.y - gridSize + offset);
                break;
            case 'top-right':
                ctx.moveTo(this.x + gridSize / 2 + offset, this.y - gridSize + offset);
                ctx.lineTo(this.x + gridSize + offset, this.y + offset);
                break;
            case 'top':
                ctx.moveTo(this.x - gridSize / 2 + offset, this.y - gridSize + offset);
                ctx.lineTo(this.x + gridSize / 2 + offset, this.y - gridSize + offset);
                break;
            case 'bottom':
                ctx.moveTo(this.x - gridSize / 2 + offset, this.y + gridSize + offset);
                ctx.lineTo(this.x + gridSize / 2 + offset, this.y + gridSize + offset);
                break;
            case 'bottom-left':
                ctx.moveTo(this.x - gridSize + offset, this.y + offset);
                ctx.lineTo(this.x - gridSize / 2 + offset, this.y + gridSize + offset);
                break;
            case 'bottom-right':
                ctx.moveTo(this.x + gridSize / 2 + offset, this.y + gridSize + offset);
                ctx.lineTo(this.x + gridSize + offset, this.y + offset);
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
    
    brightenColor() {
        let hex = this.teamColor.replace(/^#/, '');

        // Parse the R, G, B values
        let r = parseInt(hex.substring(0, 2), 16);
        let g = parseInt(hex.substring(2, 4), 16);
        let b = parseInt(hex.substring(4, 6), 16);

        // Increase each component by the percentage
        r = Math.min(255, Math.floor(r + (255 - r) * (20 / 100)));
        g = Math.min(255, Math.floor(g + (255 - g) * (20 / 100)));
        b = Math.min(255, Math.floor(b + (255 - b) * (20 / 100)));

        return '#' + [r, g, b].map(x =>
            x.toString(16).padStart(2, '0')
        ).join('');
    }

    drawOutlines() {
        let options = ['top', 'top-right', 'bottom-right', 'bottom', 'bottom-left', 'top-left'];
        for (let i = 0; i < options.length; i++) {
            if (this.neighbours.some(obj => obj.side === options[i])) {
                let index = options.indexOf(options[i]);
                options.splice(index, 1);
                i--;
            }
        }
        for (let i = 0; i < options.length; i++) {
            this.drawOutline(options[i]);
        }
    }
}