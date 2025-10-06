export class Settings {

    #gridSize = {
        x: 4,
        y: 4,
    }

    get gridSize() {
        return this.#gridSize;
    }

    set gridSize(gridSize) {
        this.#gridSize = gridSize;
    }

}