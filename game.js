// game.js
import { GAME_STATUSES } from "./GAME_STATUSES.js";
import { Google } from "./Google.js";
import { Player } from "./player.js";
import { Settings } from "./Settings.js";
import { SamuraiNumberUtilitty } from "./samurai-number-utilitty.js";

export class Game {
    #status = GAME_STATUSES.PENDING;
    #numberUtility = new SamuraiNumberUtilitty();
    #settings;
    #google = null;
    #player1 = new Player();
    #player2 = new Player();
    #gameInterval = null;

    constructor() {
        this.#settings = new Settings();
        this.#settings.gridSize = { x: 4, y: 4 };  // Default для init
        this.#google = new Google(this.#settings);
        this.#google.jumpGoogle();  // Initial pos для Google

        this.#createPlayers();  // Init игроков после settings
    }

    #createPlayers() {
        const gridX = this.#settings.gridSize.x;
        const gridY = this.#settings.gridSize.y;

        // Player1 random
        const player1Pos = {
            x: this.#numberUtility.getRandomInteger(0, gridX),
            y: this.#numberUtility.getRandomInteger(0, gridY)
        };
        this.#player1.moveTo(player1Pos.x, player1Pos.y);

        // Player2 random, avoiding player1
        const player2Pos = this.#getRandomPosition([player1Pos]);
        this.#player2.moveTo(player2Pos.x, player2Pos.y);
    }

    #getRandomPosition(coordinates = []) {
        const gridX = this.#settings.gridSize.x;
        const gridY = this.#settings.gridSize.y;
        let newX, newY;

        do {
            newX = this.#numberUtility.getRandomInteger(0, gridX);
            newY = this.#numberUtility.getRandomInteger(0, gridY);
        } while (coordinates.some((el) => el.x === newX && el.y === newY));

        return { x: newX, y: newY };
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

    get player1() {
        return this.#player1;
    }

    get player2() {
        return this.#player2;
    }

    start(x = 4, y = 4) {  // Default для теста1
        if (this.#status !== GAME_STATUSES.PENDING) {
            return;
        }
        this.#status = GAME_STATUSES.IN_PROGRESS;
        this.#settings.gridSize = { x, y };

        // Если размер изменился, re-init игроков (и Google)
        if (x !== 4 || y !== 4) {
            this.#createPlayers();
            this.#google.jumpGoogle();  // Re-pos Google
        }

        // Запуск прыжков Google каждую секунду
        this.#gameInterval = setInterval(() => {
            if (this.#status !== GAME_STATUSES.IN_PROGRESS) {
                return;
            }
            this.#performJump();
        }, 1000);

        console.log(this.#status);
    }

    #performJump() {
        let attempts = 0;
        const maxAttempts = 100;

        const currentPos = this.#google.position ? { ...this.#google.position } : null;

        while (attempts < maxAttempts) {
            this.#google.jumpGoogle();
            const newPos = this.#google.position;

            if (currentPos && newPos.x === currentPos.x && newPos.y === currentPos.y) {
                attempts++;
                continue;
            }

            if (this.#isPositionFree(newPos)) {
                console.log(`Google прыгнул в новую свободную клетку: ${newPos.x}, ${newPos.y}`);
                return;
            } else {
                attempts++;
            }
        }

        console.warn('Не удалось найти новую свободную клетку для Google после', maxAttempts, 'попыток');
    }

    #isPositionFree(pos) {
        if (!pos) return false;

        if (this.#player1.hasPosition() && this.#player1.isAt(pos)) {
            return false;
        }

        if (this.#player2.hasPosition() && this.#player2.isAt(pos)) {
            return false;
        }

        return true;
    }

    stop() {
        this.#status = GAME_STATUSES.PAUSED;
        this.#clearInterval();
        console.log(this.#status);
    }

    googleWin() {
        this.#status = GAME_STATUSES.GOOGLE_WIN;
        this.#clearInterval();
        console.log(this.#status);
    }

    playerWin() {
        this.#status = GAME_STATUSES.PLAYER_WIN;
        this.#clearInterval();
        console.log(this.#status);
    }

    #clearInterval() {
        if (this.#gameInterval) {
            clearInterval(this.#gameInterval);
            this.#gameInterval = null;
        }
    }
}