import {
    changeHex,
    configureNeigboursForIslands,
    redrawMap
} from './helperFunctions.js';
import { Dice } from './Dice.js';

export class Island {
    constructor(head, team, teamColour) {
        this.head = head;
        this.team = team;
        this.teamColour = teamColour;
        this.neighbourIslands = [];
        
        // Variables for mouse hovering and clicking
        this.highlighted = false;
        this.selected = false;
        this.mouseInBounds = false;

        this.dices = [];
        this.centerX = 0;
        this.centerY = 0;

        // Initial setup actions
        this.assignToChildren();
        this.assignToChunks();
        this.findCenter();
        this.setUpDices();
    }
    
    draw() {
        for (let nextNode = this.head; nextNode !== null; nextNode = nextNode.next) {
            if (nextNode !== null) {
                nextNode.drawFill(this.teamColour);
            } else {
                return;
            }
        }
    }

    drawDices() {
        for (let x = 0; x < 2; x++) {
            for (let y = 0; y < 5; y++) {
                if (x * 5 + y >= this.dices.length) {
                    return;
                }
                let r = 20;
                let currX = this.centerX - r / 2 + r * x;
                let currY = this.centerY + (3 * r) - r * (y + 1);
                this.dices[x * 5 + y].draw(currX, currY, r, 2, changeHex(this.teamColour, -40), 'black');
            }
        }
    }

    drawOutlines() {
        for (let node = this.head; node !== null; node = node.next){
            node.drawOutlines();
        }
    }

    configureNeigbours() {
        for (let node = this.head; node !== null; node = node.next) {
            this.setNeighbour(node);
        }
    }

    setNeighbour(node) {
        let nextNode = node.next;
        let prevNode = node.prev;
        while (nextNode !== null) {
            if (node.x - nextNode.x > neighbourConstant - 1 && node.x - nextNode.x < neighbourConstant + 1 && node.y - nextNode.y === -gridSize) {
                // Bottom left
                if (!node.neighbours.some(obj => obj.side === 'bottom-left')) {
                    node.neighbours.push({
                        side: 'bottom-left',
                        polygon: nextNode
                    });
                };
            }
            if (node.x - nextNode.x > -neighbourConstant - 1 && node.x - nextNode.x < -neighbourConstant + 1 && node.y - nextNode.y === -gridSize) {
                // Bottom right
                if (!node.neighbours.some(obj => obj.side === 'bottom-right')) {
                    node.neighbours.push({
                        side: 'bottom-right',
                        polygon: nextNode
                    });
                }
            }
            if (node.y - nextNode.y === gridSize * 2 && node.x - nextNode.x > -1 && node.x - nextNode.x < 1) {
                // Top
                if (!node.neighbours.some(obj => obj.side === 'top')) {
                    node.neighbours.push({
                        side: 'top',
                        polygon: nextNode
                    });
                }
            }
            if (node.y - nextNode.y === -gridSize * 2 && node.x - nextNode.x > -1 && node.x - nextNode.x < 1) {
                // Bottom
                if (!node.neighbours.some(obj => obj.side === 'bottom')) {
                    node.neighbours.push({
                        side: 'bottom',
                        polygon: nextNode
                    });
                }
            }
            if (node.y - nextNode.y === gridSize && node.x - nextNode.x > neighbourConstant - 1 && node.x - nextNode.x < neighbourConstant + 1) {
                // Top left
                if (!node.neighbours.some(obj => obj.side === 'top-left')) {
                    node.neighbours.push({
                        side: 'top-left',
                        polygon: nextNode
                    });
                }
            }
            if (node.y - nextNode.y === gridSize && node.x - nextNode.x > -neighbourConstant - 1 && node.x - nextNode.x < -neighbourConstant + 1) {
                // Top right
                if (!node.neighbours.some(obj => obj.side === 'top-right')) {
                    node.neighbours.push({
                        side: 'top-right',
                        polygon: nextNode
                    });
                }
            }
            nextNode = nextNode.next;
        }
        while (prevNode !== null) {
            if (node.x - prevNode.x > neighbourConstant - 1 && node.x - prevNode.x < neighbourConstant + 1 && node.y - prevNode.y === -gridSize) {
                // Bottom left
                if (!node.neighbours.some(obj => obj.side === 'bottom-left')) {
                    node.neighbours.push({
                        side: 'bottom-left',
                        polygon: prevNode
                    });
                }
            }
            if (node.x - prevNode.x > -neighbourConstant - 1 && node.x - prevNode.x < -neighbourConstant + 1 && node.y - prevNode.y === -gridSize) {
                // Bottom right
                if (!node.neighbours.some(obj => obj.side === 'bottom-right')) {
                    node.neighbours.push({
                        side: 'bottom-right',
                        polygon: prevNode
                    });
                }
            }
            if (node.y - prevNode.y === gridSize * 2 && node.x - prevNode.x > -1 && node.x - prevNode.x < 1) {
                // Top
                if (!node.neighbours.some(obj => obj.side === 'top')) {
                    node.neighbours.push({
                        side: 'top',
                        polygon: prevNode
                    });
                }
            }
            if (node.y - prevNode.y === -gridSize * 2 && node.x - prevNode.x > -1 && node.x - prevNode.x < 1) {
                // Bottom
                if (!node.neighbours.some(obj => obj.side === 'bottom')) {
                    node.neighbours.push({
                        side: 'bottom',
                        polygon: prevNode
                    });
                }
            }
            if (node.y - prevNode.y === gridSize && node.x - prevNode.x > neighbourConstant - 1 && node.x - prevNode.x < neighbourConstant + 1) {
                // Top left
                if (!node.neighbours.some(obj => obj.side === 'top-left')) {
                    node.neighbours.push({
                        side: 'top-left',
                        polygon: prevNode
                    });
                }
            }
            if (node.y - prevNode.y === gridSize && node.x - prevNode.x > -neighbourConstant - 1 && node.x - prevNode.x < -neighbourConstant + 1) {
                // Top right
                if (!node.neighbours.some(obj => obj.side === 'top-right')) {
                    node.neighbours.push({
                        side: 'top-right',
                        polygon: prevNode
                    });
                }
            }
            prevNode = prevNode.prev;
        }
    }

    assignToChildren() {
        for (let node = this.head; node != null; node = node.next) {
            node.island = this;
        }
    }

    assignToChunks() {
        for (let node = this.head; node !== null; node = node.next) {
            let chunkX = node.x - (node.x % chunkSize) + chunkSize / 2;
            let chunkY = node.y - (node.y % chunkSize) + chunkSize / 2;

            const key = [chunkX, chunkY].join(':');
            
            let currentChunkValue = chunkMap.get(key);
            this.updateChunkValue(key, currentChunkValue);
    
            // Check other surrounding chunks, in case the polygon overlaps with neighbour chunks
            // Top left
            if (node.x - node.r <= chunkX - chunkSize / 2 &&
                node.y - node.r <= chunkY - chunkSize / 2) {
                const topLeftCornerX = chunkX - chunkSize / 2;
                const topLeftCornerY = chunkY - chunkSize / 2;
                const polyLeftCornerPosX = node.x - node.r;
                const polyTopLeftCornerPosY = node.y - node.r;        
                const xProportion = (topLeftCornerX - polyLeftCornerPosX) / (node.r / 2);
                const yProportion = (topLeftCornerY - polyTopLeftCornerPosY) / node.r;
                if (xProportion + yProportion >= 1) {
                    let currKey = [chunkX - chunkSize, chunkY - chunkSize].join(':');
                    let currentChunkValue = chunkMap.get(currKey);
                    this.updateChunkValue(currKey, currentChunkValue);
                }
            }
            // Top
            if (node.x >= chunkX - chunkSize / 2 &&
                 node.x <= chunkX + chunkSize / 2 && 
                node.y - gridSize <= chunkY - chunkSize / 2) {
                let currentChunkValue = chunkMap.get([chunkX, chunkY - chunkSize].join(':'));
                this.updateChunkValue([chunkX, chunkY - chunkSize].join(':'), currentChunkValue);
            }
            // Top right
            if (node.x + node.r >= chunkX + chunkSize / 2 &&
                node.y - node.r <= chunkY - chunkSize / 2) {
                // This gets the coordinates of the top right corner of the chunk grid we are currently in
                const topRightCornerX = chunkX + chunkSize / 2;
                const topRightCornerY = chunkY - chunkSize / 2;
                const polyRightCornerPosX = node.x + node.r;
                const polyTopRightCornerPosY = node.y - node.r;
                const xProportion = (polyRightCornerPosX - topRightCornerX) / (node.r / 2);
                const yProportion = (topRightCornerY - polyTopRightCornerPosY) / node.r;
                if (xProportion + yProportion >= 1) {
                    let currKey = [chunkX + chunkSize, chunkY - chunkSize].join(':');
                    let currentChunkValue = chunkMap.get(currKey);
                    this.updateChunkValue(currKey, currentChunkValue);
                }
            }
            // Right
            if (node.x + gridSize >= chunkX + chunkSize / 2 &&
                node.y >= chunkY - chunkSize / 2 &&
                node.y <= chunkY + chunkSize / 2) {
                let currKey = [chunkX + chunkSize, chunkY].join(':');
                let currentChunkValue = chunkMap.get(currKey);
                this.updateChunkValue(currKey, currentChunkValue);
            }
            // Bottom right
            if (node.x + node.r >= chunkX + chunkSize / 2 &&
                node.y + node.r >= chunkY + chunkSize / 2) {
                const bottomRightCornerX = chunkX + chunkSize / 2;
                const bottomRightCornerY = chunkY + chunkSize / 2;
                const polyRightCornerPosX = node.x + node.r;
                const polyBottomRightCornerPosY = node.y + node.r;        
                const xProportion = (polyRightCornerPosX - bottomRightCornerX) / (node.r / 2);
                const yProportion = (polyBottomRightCornerPosY - bottomRightCornerY) / node.r;
                if (xProportion + yProportion >= 1) {
                    let currKey = [chunkX + chunkSize, chunkY + chunkSize].join(':');
                    let currentChunkValue = chunkMap.get(currKey);
                    this.updateChunkValue(currKey, currentChunkValue);
                }
            }
            // Bottom
            if (node.x >= chunkX - chunkSize / 2 && 
                node.x <= chunkX + chunkSize / 2 && 
                node.y + gridSize >= chunkY + chunkSize / 2) {
                let currKey = [chunkX, chunkY + chunkSize].join(':');
                let currentChunkValue = chunkMap.get(currKey);
                this.updateChunkValue(currKey, currentChunkValue);
            }
            // Bottom left
            if (node.x - node.r <= chunkX - chunkSize / 2 &&
                node.y + node.r >= chunkY + chunkSize / 2) {
                const bottomLeftCornerX = chunkX - chunkSize / 2;
                const bottomLeftCornerY = chunkY + chunkSize / 2;
                const polyLeftCornerPosX = node.x - node.r;
                const polyBottomLeftCornerPosY = node.y + node.r;        
                const xProportion = (bottomLeftCornerX - polyLeftCornerPosX) / (node.r / 2);
                const yProportion = (polyBottomLeftCornerPosY - bottomLeftCornerY) / node.r;
                if (xProportion + yProportion >= 1) {
                    let currKey = [chunkX - chunkSize, chunkY + chunkSize].join(':');
                    let currentChunkValue = chunkMap.get(currKey);
                    this.updateChunkValue(currKey, currentChunkValue);
                }
            }
            // Left
            if (node.x - gridSize <= chunkX - chunkSize / 2 && 
                node.y >= chunkY - chunkSize / 2 && 
                node.y <= chunkY + chunkSize / 2) {
                let currKey = [chunkX - chunkSize, chunkY].join(':');
                let currentChunkValue = chunkMap.get(currKey);
                this.updateChunkValue(currKey, currentChunkValue);
            }
        }
    }

    hover(mouseX, mouseY) {
        this.highlighted = false;
        this.mouseInBounds = false;
        for (let node = this.head; node !== null; node = node.next){
            let bottomLeftExtraX = (mouseX - (node.x - node.r)) / (node.r / 2);
            let bottomLeftExtraY = ((node.y + node.r) - mouseY) / node.r;
            let topLeftExtraX = (mouseX - (node.x - node.r)) / (node.r / 2);
            let topLeftExtraY = (mouseY - (node.y - node.r)) / node.r;
            let topRightExtraX = ((node.x + node.r) - mouseX) / (node.r / 2);
            let topRightExtraY = (mouseY - (node.y - node.r)) / node.r;
            let bottomRightExtraX = ((node.x + node.r) - mouseX) / (node.r / 2);
            let bottomRightExtraY = ((node.y + node.r) - mouseY) / node.r;
            if (bottomLeftExtraX + bottomLeftExtraY >= 1 &&
                topLeftExtraX + topLeftExtraY >= 1 && 
                topRightExtraX + topRightExtraY >= 1 &&
                bottomRightExtraX + bottomRightExtraY >= 1 && 
                mouseY >= node.y - node.r && 
                mouseY < node.y + node.r) {
                this.highlighted = true;
                this.mouseInBounds = true;
                break;
            }
        }
        if (!this.selected && selectedIsland === null) {
            if (this.highlighted) {
                for (let i = this.head; i !== null; i = i.next){
                    i.drawFill(changeHex(this.teamColour));
                    i.drawOutlines();
                }
            } else {
                for (let i = this.head; i !== null; i = i.next){
                    i.drawFill();
                    i.drawOutlines();
                }
            }
            this.drawDices();
        }
    }

    click() {
        // Handling selecting and highlighting upon click
        if (this.highlighted) {
            if (!this.selected && selectedIsland === null) {
                this.selected = true;
                for (let i = this.head; i !== null; i = i.next){
                    i.drawFill('black');
                    i.drawOutlines('red');
                }
                selectedIsland = this;
            } else if (selectedIsland === this){
                this.selected = false;
                for (let i = this.head; i !== null; i = i.next){
                    i.drawFill(changeHex(this.teamColour));
                    i.drawOutlines();
                }
                selectedIsland = null;
            }
            this.drawDices();
        }

        // Handling attacking
        if (selectedIsland !== null && 
            selectedIsland.team !== this.team && 
            this.mouseInBounds && 
            this.neighbourIslands.some(island => island === selectedIsland)) {
            if (!this.throwDice()) {
                // The attacker island won
                this.dices = selectedIsland.dices;
                this.removeDice();
                this.team = selectedIsland.team;
                this.teamColour = selectedIsland.teamColour;
                this.neighbourIslands.splice(this.neighbourIslands.indexOf(selectedIsland));
                selectedIsland.neighbourIslands.splice(selectedIsland.neighbourIslands.indexOf(this));
                configureNeigboursForIslands(polygonArr);
            }
            selectedIsland.selected = false;
            selectedIsland.resetDices();
            selectedIsland.drawDices();
            selectedIsland = null;
            redrawMap();
        }
    }

    updateChunkValue(key, value) {
        if (![...value.islands].includes(this)){
            value.add(this);
            chunkMap.set(key, value);
        }
    }

    findCenter() {
        let minX = 99999;
        let maxX = 0;
        let minY = 99999;
        let maxY = 0;

        for (let node = this.head; node !== null; node = node.next) {
            if (node.x < minX) {
                minX = node.x;
            }
            if (node.x >= maxX) {
                maxX = node.x;
            }
            if (node.y < minY) {
                minY = node.y;
            }
            if (node.y >= maxY) {
                maxY = node.y;
            }
        }

        this.centerX = minX + ((maxX - minX) / 2);
        this.centerY = minY + ((maxY - minY) / 2);
    }

    setUpDices() {
        let r = 1 + Math.floor(Math.random() * 10);
        for (let i = 0; i < r; i++) {
            this.dices.push(new Dice());
        }
    }

    throwDice() {
        let currIslandScore = 0;
        let selectedIslandScore = 0;

        for (let i = 0; i < this.dices.length; i++) {
            currIslandScore += 1 + Math.floor(Math.random() * 6);
        }
        for (let i = 0; i < selectedIsland.dices.length; i++) {
            selectedIslandScore += 1 + Math.floor(Math.random() * 6);
        }

        if (currIslandScore >= selectedIslandScore) {
            return true;
        } else {
            return false;
        }
    }

    resetDices() {
        this.dices = [];
        this.dices.push(new Dice());
    }

    removeDice() {
        if (this.dices.length > 1){
            this.dices.splice(this.dices.length - 1);
        }
    }
}