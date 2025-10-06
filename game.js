import {GAME_STATUSES} from "./GAME_STATUSES.js";

export class Game {
    #status = GAME_STATUSES.PENDING

    get status() {
        return this.#status;
    }

    start() {
      this.#status = GAME_STATUSES.IN_PROGRESS
        console.log(this.#status)
    }

    stop() {
        this.#status = GAME_STATUSES.PAUSED
        console.log(this.#status)
    }

    googleWin() {
        this.#status = GAME_STATUSES.GOOGLE_WIN
        console.log(this.#status)
    }

    playerWin() {
        this.#status = GAME_STATUSES.PLAYER_WIN
        console.log(this.#status)
    }
}

const game = new Game();
game.start();
game.stop();
game.googleWin();
game.playerWin();