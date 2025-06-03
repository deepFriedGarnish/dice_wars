export class Island {
    constructor(head) {
        this.head = head;
        this.assignToChildren();
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
}