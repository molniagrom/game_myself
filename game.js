// game.js
import { GAME_STATUSES } from "./GAME_STATUSES.js";
import { Google } from "./Google.js";
import { Player } from "./player.js";
import { Settings } from "./Settings.js";

export class Game {
    #status = GAME_STATUSES.PENDING;
    #settings;
    #google = null;
    #player1 = new Player();
    #player2 = new Player();

    constructor() {
        this.#settings = new Settings();
        this.#google = new Google(this.#settings);
    }

    get status() {
        return this.#status;
    }

    get google() {
        return this.#google;
    }

    get settings() {
        return this.#settings;
    }

    start() {
        this.#status = GAME_STATUSES.IN_PROGRESS;
        this.#settings.gridSize = { x: 4, y: 4 };
        console.log(this.#status);
    }

    stop() {
        this.#status = GAME_STATUSES.PAUSED;
        console.log(this.#status);
    }

    googleWin() {
        this.#status = GAME_STATUSES.GOOGLE_WIN;
        console.log(this.#status);
    }

    playerWin() {
        this.#status = GAME_STATUSES.PLAYER_WIN;
        console.log(this.#status);
    }
}