// game.test.js
import { Game } from "./game.js";
import { GAME_STATUSES } from "./GAME_STATUSES.js";
import { Google } from "./Google.js";
import { Settings } from "./Settings.js";

describe('Game', () => {
    it('should have status pending after creating', () => {
        const game = new Game();
        expect(game.status).toEqual(GAME_STATUSES.PENDING);
    });

    it('should have status inProgress after start, and change grid', () => {
        const game = new Game();
        game.start();
        expect(game.status).toEqual(GAME_STATUSES.IN_PROGRESS);
        expect(game.settings.gridSize).toEqual({ x: 4, y: 4 });
    });

    it('google position should change after multiple jumps', () => {
        const game = new Game();
        game.start();

        const google = game.google;

        google.jumpGoogle();
        const firstPosition = { ...google.position };

        let positionChanged = false;
        for (let i = 0; i < 50; i++) {
            google.jumpGoogle();
            if (google.position.x !== firstPosition.x || google.position.y !== firstPosition.y) {
                positionChanged = true;
                break;
            }
        }

        expect(positionChanged).toBe(true);
    });
});