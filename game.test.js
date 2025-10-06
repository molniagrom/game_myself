// game.test.js
import { Game } from "./game.js";
import { GAME_STATUSES } from "./GAME_STATUSES.js";
import { Google } from "./Google.js";
import { Settings } from "./Settings.js";

describe('Game', () => {
    it('should have status pending after creating', () => {  // Убрал async/await
        const game = new Game();
        expect(game.status).toBe(GAME_STATUSES.PENDING);
        game.start();  // Default 4x4
        expect(game.status).toBe(GAME_STATUSES.IN_PROGRESS);
    });

    it('should have status inProgress after start, and change grid', () => {
        const game = new Game();
        game.start(4, 4);
        expect(game.status).toEqual(GAME_STATUSES.IN_PROGRESS);
        expect(game.settings.gridSize).toEqual({ x: 4, y: 4 });
    });

    it('google position should change after multiple jumps', () => {
        const game = new Game();
        game.start(4, 4);

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

    it('should jump to different position and avoid players', () => {
        const game = new Game();
        game.start(4, 4);

        // Размещаем игрока на клетке {1, 1}
        game.player1.moveTo(1, 1);

        // Выполняем несколько прыжков вручную (симулируем тики)
        const initialPos = { ...game.google.position };
        game.google.jumpGoogle();  // Первый прыжок

        let jumps = 0;
        let avoidedPlayer = true;
        let changedPosition = false;

        // Симулируем 10 прыжков
        for (let i = 0; i < 10; i++) {
            const beforePos = { ...game.google.position };
            game.google.jumpGoogle();

            // Проверяем, что не на игроке
            if (game.google.position.x === 1 && game.google.position.y === 1) {
                avoidedPlayer = false;
            }

            // Проверяем изменение
            if (game.google.position.x !== beforePos.x || game.google.position.y !== beforePos.y) {
                changedPosition = true;
            }

            jumps++;
            if (changedPosition && avoidedPlayer) break;
        }

        expect(jumps).toBeGreaterThan(0);
        expect(avoidedPlayer).toBe(true);
        expect(changedPosition).toBe(true);
    });

    it('player1, player2 should have unique coordinates', () => {  // Убрал async, fix expect
        for (let i = 0; i < 10; i++) {
            const game = new Game();
            game.start();  // Default

            expect([0, 1, 2, 3]).toContain(game.player1.position.x);  // Fix: 0-3 for 4x4
            expect([0, 1, 2, 3]).toContain(game.player1.position.y);

            expect([0, 1, 2, 3]).toContain(game.player2.position.x);
            expect([0, 1, 2, 3]).toContain(game.player2.position.y);

            expect(
                game.player1.position.x !== game.player2.position.x ||
                game.player1.position.y !== game.player2.position.y
            ).toBe(true);  // Unique
        }
    });
});