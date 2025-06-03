export class Island {
    constructor(head) {
        this.head = head;
        this.highlighted = false;
        this.assignToChildren();
        this.assignToChunks();
    }
    
    draw() {
        for (let nextNode = this.head; nextNode !== null; nextNode = nextNode.next) {
            if (nextNode !== null) {
                nextNode.drawFill();
            } else {
                return;
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
            
            let currentChunkValue = chunkMap.get([chunkX, chunkY].join(':'));
            if (![...currentChunkValue.islands].includes(this)){
                currentChunkValue.add(this);
            }
            chunkMap.set([chunkX, chunkY], currentChunkValue);
    
            // Check other surrounding chunks, in case the polygon overlaps with neighbour chunks
            // Top left
            if (node.x - node.r < chunkX - chunkSize / 2 &&
                node.y - node.r < chunkY - chunkSize / 2) {
                const topLeftCornerX = chunkX - chunkSize / 2;
                const topLeftCornerY = chunkY - chunkSize / 2;
                const polyLeftCornerPosX = node.x - node.r;
                const polyTopLeftCornerPosY = node.y - node.r;        
                const xProportion = (topLeftCornerX - polyLeftCornerPosX) / (node.r / 2);
                const yProportion = (topLeftCornerY - polyTopLeftCornerPosY) / node.r;
                if (xProportion + yProportion >= 1) {
                    let currentChunkValue = chunkMap.get([chunkX + chunkSize, chunkY + chunkSize].join(':'));
                    if (![...currentChunkValue.islands].includes(this)){
                        currentChunkValue.add(this);
                    }   
                    chunkMap.set([chunkX, chunkY], currentChunkValue);
                }
            }
            // Top
            if (node.x > chunkX - chunkSize / 2 &&
                 node.x < chunkX + chunkSize / 2 && 
                node.y - gridSize < chunkY - chunkSize / 2) {
                let currentChunkValue = chunkMap.get([chunkX, chunkY - chunkSize].join(':'));
                if (![...currentChunkValue.islands].includes(this)){
                    currentChunkValue.add(this);
                } 
                chunkMap.set([chunkX, chunkY], currentChunkValue);
            }
            // Top right
            if (node.x + node.r > chunkX + chunkSize / 2 &&
                node.y - node.r < chunkY - chunkSize / 2) {
                const topRightCornerX = chunkX + chunkSize / 2;
                const topRightCornerY = chunkY - chunkSize / 2;
                const polyRightCornerPosX = node.x + node.r;
                const polyTopRightCornerPosY = node.y - node.r;        
                const xProportion = (polyRightCornerPosX - topRightCornerX) / (node.r / 2);
                const yProportion = (topRightCornerY - polyTopRightCornerPosY) / node.r;
                if (xProportion + yProportion >= 1) {
                    let currentChunkValue = chunkMap.get([chunkX + chunkSize, chunkY + chunkSize].join(':'));
                    if (![...currentChunkValue.islands].includes(this)){
                        currentChunkValue.add(this);
                    } 
                    chunkMap.set([chunkX, chunkY], currentChunkValue);
                }
            }
            // Right
            if (node.x + gridSize > chunkX + chunkSize / 2 &&
                node.y > chunkY - chunkSize / 2 &&
                node.y < chunkY + chunkSize / 2) {
                let currentChunkValue = chunkMap.get([chunkX + chunkSize, chunkY].join(':'));
                if (![...currentChunkValue.islands].includes(this)){
                    currentChunkValue.add(this);
                } 
                chunkMap.set([chunkX, chunkY], currentChunkValue);
            }
            // Bottom right
            if (node.x + node.r > chunkX + chunkSize / 2 &&
                node.y + node.r > chunkY + chunkSize / 2) {
                const bottomRightCornerX = chunkX + chunkSize / 2;
                const bottomRightCornerY = chunkY + chunkSize / 2;
                const polyRightCornerPosX = node.x + node.r;
                const polyBottomRightCornerPosY = node.y + node.r;        
                const xProportion = (polyRightCornerPosX - bottomRightCornerX) / (node.r / 2);
                const yProportion = (polyBottomRightCornerPosY - bottomRightCornerY) / node.r;
                if (xProportion + yProportion >= 1) {
                    let currentChunkValue = chunkMap.get([chunkX + chunkSize, chunkY + chunkSize].join(':'));
                    if (![...currentChunkValue.islands].includes(this)){
                        currentChunkValue.add(this);
                    } 
                    chunkMap.set([chunkX, chunkY], currentChunkValue);
                }
            }
            // Bottom
            if (node.x > chunkX - chunkSize / 2 && 
                node.x < chunkX + chunkSize / 2 && 
                node.y + gridSize > chunkY + chunkSize / 2) {
                let currentChunkValue = chunkMap.get([chunkX, chunkY + chunkSize].join(':'));
                if (![...currentChunkValue.islands].includes(this)){
                    currentChunkValue.add(this);
                }
                chunkMap.set([chunkX, chunkY], currentChunkValue);
            }
            // Bottom left
            if (node.x - node.r < chunkX - chunkSize / 2 &&
                node.y + node.r > chunkY + chunkSize / 2) {
                const bottomLeftCornerX = chunkX - chunkSize / 2;
                const bottomLeftCornerY = chunkY + chunkSize / 2;
                const polyLeftCornerPosX = node.x - node.r;
                const polyBottomLeftCornerPosY = node.y + node.r;        
                const xProportion = (bottomLeftCornerX - polyLeftCornerPosX) / (node.r / 2);
                const yProportion = (polyBottomLeftCornerPosY - bottomLeftCornerY) / node.r;
                if (xProportion + yProportion >= 1) {
                    let currentChunkValue = chunkMap.get([chunkX + chunkSize, chunkY + chunkSize].join(':'));
                    if (![...currentChunkValue.islands].includes(this)){
                        currentChunkValue.add(this);
                    }
                    chunkMap.set([chunkX, chunkY], currentChunkValue);
                }
            }
            // Left
            if (node.x - gridSize < chunkX - chunkSize / 2 && 
                node.y > chunkY - chunkSize / 2 && 
                node.y < chunkY + chunkSize / 2) {
                let currentChunkValue = chunkMap.get([chunkX - chunkSize, chunkY].join(':'));
                if (![...currentChunkValue.islands].includes(this)){
                    currentChunkValue.add(this);
                }
                chunkMap.set([chunkX, chunkY], currentChunkValue);
            }
        }
    }

    hover(mouseX, mouseY) {
        this.highlighted = false;
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
                mouseY > node.y - node.r && 
                mouseY < node.y + node.r) {
                this.highlighted = true;
                break;
            }
        }
        if (this.highlighted) {
            for (let i = this.head; i !== null; i = i.next){
                i.drawFill(i.brightenColor());
                i.drawOutlines();
            }
        } else {
            for (let i = this.head; i !== null; i = i.next){
                i.drawFill();
                i.drawOutlines();
            }
        }
    }
}