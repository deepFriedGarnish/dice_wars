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
        this.assignToChunks();
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

    assignToChunks() {
        let chunkX = this.x - (this.x % chunkSize) + chunkSize / 2;
        let chunkY = this.y - (this.y % chunkSize) + chunkSize / 2;
        
        let currentChunkValue = chunkMap.get([chunkX, chunkY].join(':'));
        currentChunkValue.add(this);
        chunkMap.set([chunkX, chunkY], currentChunkValue);

        // Check other surrounding chunks, in case the polygon overlaps with neighbour chunks
        // Top left
        if (this.x - this.r < chunkX - chunkSize / 2 &&
            this.y - this.r < chunkY - chunkSize / 2) {
            const topLeftCornerX = chunkX - chunkSize / 2;
            const topLeftCornerY = chunkY - chunkSize / 2;
            const polyLeftCornerPosX = this.x - this.r;
            const polyTopLeftCornerPosY = this.y - this.r;        
            const xProportion = (topLeftCornerX - polyLeftCornerPosX) / (this.r / 2);
            const yProportion = (topLeftCornerY - polyTopLeftCornerPosY) / this.r;
            if (xProportion + yProportion >= 1) {
                let currentChunkValue = chunkMap.get([chunkX + chunkSize, chunkY + chunkSize].join(':'));
                currentChunkValue.add(this);
                chunkMap.set([chunkX, chunkY], currentChunkValue);
            }
        }
        // Top
        if (this.x > chunkX - chunkSize / 2 && this.x < chunkX + chunkSize / 2 && this.y - gridSize < chunkY - chunkSize / 2) {
            let currentChunkValue = chunkMap.get([chunkX, chunkY - chunkSize].join(':'));
            currentChunkValue.add(this);
            chunkMap.set([chunkX, chunkY], currentChunkValue);
        }
        // Top right
        if (this.x + this.r > chunkX + chunkSize / 2 &&
            this.y - this.r < chunkY - chunkSize / 2) {
            const topRightCornerX = chunkX + chunkSize / 2;
            const topRightCornerY = chunkY - chunkSize / 2;
            const polyRightCornerPosX = this.x + this.r;
            const polyTopRightCornerPosY = this.y - this.r;        
            const xProportion = (polyRightCornerPosX - topRightCornerX) / (this.r / 2);
            const yProportion = (topRightCornerY - polyTopRightCornerPosY) / this.r;
            if (xProportion + yProportion >= 1) {
                let currentChunkValue = chunkMap.get([chunkX + chunkSize, chunkY + chunkSize].join(':'));
                currentChunkValue.add(this);
                chunkMap.set([chunkX, chunkY], currentChunkValue);
            }
        }
        // Right
        if (this.x + gridSize > chunkX + chunkSize / 2 && this.y > chunkY - chunkSize / 2 && this.y < chunkY + chunkSize / 2) {
            let currentChunkValue = chunkMap.get([chunkX + chunkSize, chunkY].join(':'));
            currentChunkValue.add(this);
            chunkMap.set([chunkX, chunkY], currentChunkValue);
        }
        // Bottom right
        if (this.x + this.r > chunkX + chunkSize / 2 &&
            this.y + this.r > chunkY + chunkSize / 2) {
            const bottomRightCornerX = chunkX + chunkSize / 2;
            const bottomRightCornerY = chunkY + chunkSize / 2;
            const polyRightCornerPosX = this.x + this.r;
            const polyBottomRightCornerPosY = this.y + this.r;        
            const xProportion = (polyRightCornerPosX - bottomRightCornerX) / (this.r / 2);
            const yProportion = (polyBottomRightCornerPosY - bottomRightCornerY) / this.r;
            if (xProportion + yProportion >= 1) {
                let currentChunkValue = chunkMap.get([chunkX + chunkSize, chunkY + chunkSize].join(':'));
                currentChunkValue.add(this);
                chunkMap.set([chunkX, chunkY], currentChunkValue);
            }
        }
        // Bottom
        if (this.x > chunkX - chunkSize / 2 && this.x < chunkX + chunkSize / 2 && this.y + gridSize > chunkY + chunkSize / 2) {
            let currentChunkValue = chunkMap.get([chunkX, chunkY + chunkSize].join(':'));
            currentChunkValue.add(this);
            chunkMap.set([chunkX, chunkY], currentChunkValue);
        }
        // Bottom left
        if (this.x - this.r < chunkX - chunkSize / 2 &&
            this.y + this.r > chunkY + chunkSize / 2) {
            const bottomLeftCornerX = chunkX - chunkSize / 2;
            const bottomLeftCornerY = chunkY + chunkSize / 2;
            const polyLeftCornerPosX = this.x - this.r;
            const polyBottomLeftCornerPosY = this.y + this.r;        
            const xProportion = (bottomLeftCornerX - polyLeftCornerPosX) / (this.r / 2);
            const yProportion = (polyBottomLeftCornerPosY - bottomLeftCornerY) / this.r;
            if (xProportion + yProportion >= 1) {
                let currentChunkValue = chunkMap.get([chunkX + chunkSize, chunkY + chunkSize].join(':'));
                currentChunkValue.add(this);
                chunkMap.set([chunkX, chunkY], currentChunkValue);
            }
        }
        // Left
        if (this.x - gridSize < chunkX - chunkSize / 2 && this.y > chunkY - chunkSize / 2 && this.y < chunkY + chunkSize / 2) {
            let currentChunkValue = chunkMap.get([chunkX - chunkSize, chunkY].join(':'));
            currentChunkValue.add(this);
            chunkMap.set([chunkX, chunkY], currentChunkValue);
        }
    }

    hover(mouseX, mouseY) {
        let bottomLeftExtraX = (mouseX - (this.x - this.r)) / (this.r / 2);
        let bottomLeftExtraY = ((this.y + this.r) - mouseY) / this.r;
        
        let topLeftExtraX = (mouseX - (this.x - this.r)) / (this.r / 2);
        let topLeftExtraY = (mouseY - (this.y - this.r)) / this.r;
        
        let topRightExtraX = ((this.x + this.r) - mouseX) / (this.r / 2);
        let topRightExtraY = (mouseY - (this.y - this.r)) / this.r;
        
        let bottomRightExtraX = ((this.x + this.r) - mouseX) / (this.r / 2);
        let bottomRightExtraY = ((this.y + this.r) - mouseY) / this.r;

        if (bottomLeftExtraX + bottomLeftExtraY >= 1 &&
            topLeftExtraX + topLeftExtraY >= 1 && 
            topRightExtraX + topRightExtraY >= 1 &&
            bottomRightExtraX + bottomRightExtraY >= 1 && 
            mouseY > this.y - this.r && 
            mouseY < this.y + this.r) {
                    this.drawFill(this.brightenColor());
                    this.drawOutlines();
                    for (let node = this.next; node !== null; node = node.next) {
                        node.drawFill(this.brightenColor());
                        node.drawOutlines();
                    }
                    for (let node = this.prev; node !== null; node = node.prev) {
                        node.drawFill(this.brightenColor());
                        node.drawOutlines();
                    }
                } else {
                    this.drawFill();
                    this.drawOutlines();
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