// Google.js
import { SamuraiNumberUtilitty } from "./samurai-number-utilitty.js";
import { Settings } from "./Settings.js";

export class Google {
    #settings;
    #numberUtility = new SamuraiNumberUtilitty();
    #position = null;  // Позиция Google

    constructor(settings = new Settings()) {
        this.#settings = settings;
    }

    get settings() {
        return this.#settings;
    }

    get position() {
        return this.#position;
    }

    jumpGoogle() {
        this.#position = {
            x: this.#numberUtility.getRandomInteger(0, this.#settings.gridSize.x),
            y: this.#numberUtility.getRandomInteger(0, this.#settings.gridSize.y),
        };
    }
}