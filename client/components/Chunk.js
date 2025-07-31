export class Chunk {
    constructor () {
        this.islands = [];
    }

    add(island) {
        this.islands.push(island);
    }

    checkForHover(mouseX, mouseY) {
        for (let i = 0; i < this.islands.length; i++) {
            const hoveredIsland = this.islands[i].hover(mouseX, mouseY);
            if (hoveredIsland !== null) {
                return hoveredIsland;
            }
        }
        return null;
    }

    checkForClick() {
        for (let i = 0; i < this.islands.length; i++) {
            const clickedIsland = this.islands[i].click();
            if (clickedIsland === 0) {
                return this.islands[i];
            }
            if (clickedIsland === 1) {
                return null;
            }
        }
        return selectedIsland;
    }
}