import {Game} from "./game.js";
import {GAME_STATUSES} from "./GAME_STATUSES.js";
import {Google} from "./Google.js";
import {Settings} from "./Settings.js";

describe('Game', () => {
    it('should have status pending after creating', () => {
        const game = new Game();
        expect(game.status).toEqual(GAME_STATUSES.PENDING);
    });

    it('should have status inProgress after start', () => {
        const game = new Game();
        game.start();
        expect(game.status).toEqual(GAME_STATUSES.IN_PROGRESS);
    });

    it('grid size should be changed', () => {
        const google = new Google();
        const settings = google.settings;

        const initialX = settings.gridSize.x;
        const initialY = settings.gridSize.y;

        google.jumpGoogle();

        const newX = settings.gridSize.x;
        const newY = settings.gridSize.y;

        expect(newX !== initialX || newY !== initialY).toBe(true);
    });


})