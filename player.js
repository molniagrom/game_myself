export class Player {
    #position = null;
    id = null

    constructor(position, id) {
        this.#position = position
        this.id = id
    }

    get position() {
        return this.#position;
    }

    moveTo(x, y) {
        if (typeof x !== 'number' || typeof y !== 'number') {
            throw new Error('Coordinates must be numbers');
        }
        if (x < 0 || y < 0) {
            throw new Error('Coordinates must be non-negative');
        }

        this.#position = {x, y};
    }

    isAt(position) {
        // Whether the player is in a particular position?
        // Check if a cell is occupied by a player (when Google jumps)
        // Check if the player collides with Google
        // Check if the player has reached the goal
        if (this.#position === null) return false; // player net on field
        return this.#position.x === position.x && this.#position.y === position.y;
    }

    hasPosition() {
        // Does the player have a position?
        // Check if the player has entered the game
        // Before drawing a player (do not draw if he is not on the field)
        // When initializing the game
        return this.#position !== null;
    }
}