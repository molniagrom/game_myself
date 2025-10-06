import {SamuraiNumberUtilitty} from "./samurai-number-utilitty.js";
import {Settings} from "./Settings.js";

export class Google {
    #settings = new Settings
    #numberUtility = new SamuraiNumberUtilitty

    get settings() {
        return this.#settings;
    }

    jumpGoogle() {
        this.#settings.gridSize = {
            x: this.#numberUtility.getRandomInteger(0, this.#settings.gridSize.x),
            y: this.#numberUtility.getRandomInteger(0, this.#settings.gridSize.y),
        };
    }
}