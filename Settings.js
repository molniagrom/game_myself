export class Settings {

    #gridSize = {
        x: null,
        y: null,
    }

    get gridSize() {
        return this.#gridSize;
    }

    set gridSize(gridSize) {
        this.#gridSize = gridSize;
    }

}