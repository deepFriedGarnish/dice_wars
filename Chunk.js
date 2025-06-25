export class Chunk {
    constructor () {
        this.islands = [];
    }

    add(island) {
        this.islands.push(island);
    }

    checkForHover(mouseX, mouseY) {
        for (let i = 0; i < this.islands.length; i++) {
            this.islands[i].hover(mouseX, mouseY);
        }
    }

    checkForClick() {
        for (let i = 0; i < this.islands.length; i++) {
            this.islands[i].click();
        }
    }
}