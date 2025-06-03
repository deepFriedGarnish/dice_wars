export class Chunk {
    constructor () {
        this.polygons = [];
    }

    add(node) {
        this.polygons.push(node);
    }

    checkForHover(mouseX, mouseY) {
        for (let i = 0; i < this.polygons.length; i++) {
            this.polygons[i].hover(mouseX, mouseY);
        }
    }
}