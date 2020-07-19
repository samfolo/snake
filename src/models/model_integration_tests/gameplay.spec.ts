import {TApple, Direction, TCoordinate} from '../../common/types';
import {
  DEFAULT_APPLE_SCORE_POINTS,
  DEFAULT_SNAKE_GROWTH_POINTS,
  INITIAL_SNAKE_LENGTH,
  SHINY_APPLE_SCORE_POINTS,
  SHINY_APPLE_SNAKE_GROWTH_POINTS,
} from '../../const';

import {Game} from '../Game/Game';
import {Snake} from '../Snake/Snake';

describe('gameplay logic', () => {
  let testGame: Game;
  let testSnake: Snake;
  let testApple: TApple;
  let testSize: number;
  let testHead: TCoordinate;

  beforeEach(() => {
    testSize = 21;
    testHead = [10, 10];
    testApple = {
      location: [9, 10],
      growthPoints: DEFAULT_SNAKE_GROWTH_POINTS,
      scorePoints: DEFAULT_APPLE_SCORE_POINTS,
    };

    testSnake = new Snake(testHead, testSize, Direction.UP);
    testGame = new Game(testSnake, testSize, testApple);
  });

  describe('when a snake eats an apple', () => {
    it('grows by the number of points the apple is worth', () => {
      expect(testGame.apple.location).toEqual([9, 10]);
      expect(testSnake.head).toEqual([10, 10]);
      expect(testSnake.length).toBe(3);

      testGame.nextFrame();

      const secondAppleLocation = testGame.apple.location;
      expect(secondAppleLocation).not.toEqual([9, 10]);
      expect(testSnake.head).toEqual([9, 10]);
      expect(testSnake.length).toBe(3);

      testGame.nextFrame();

      expect(testSnake.head).toEqual([8, 10]);
      expect(testSnake.length).toBe(4);
    });

    it('updates the score', () => {
      testGame.nextFrame();
      expect(testGame.score).toBe(DEFAULT_APPLE_SCORE_POINTS);
    });

    describe('a shiny apple', () => {
      beforeEach(() => {
        testApple = {
          location: [9, 10],
          growthPoints: SHINY_APPLE_SNAKE_GROWTH_POINTS,
          scorePoints: SHINY_APPLE_SCORE_POINTS,
        };

        testSnake = new Snake(testHead, testSize, Direction.UP);
        testGame = new Game(testSnake, testSize, testApple);
      });

      it('grows by the number of points the apple is worth', () => {
        const initialApple = testGame.apple;
        testGame.nextFrame();

        for (let i = 0; i < initialApple.growthPoints; i++) {
          testGame.nextFrame();
        }

        expect(testSnake.length).toBe(
          INITIAL_SNAKE_LENGTH + SHINY_APPLE_SNAKE_GROWTH_POINTS
        );
      });

      it('updates the score', () => {
        testGame.nextFrame();
        expect(testGame.score).toBe(SHINY_APPLE_SCORE_POINTS);
      });
    });
  });

  describe('when the snake collides with its own tail', () => {
    it('registers the game is over', () => {
      testSize = 3;
      testHead = [0, 0];
      testApple = {...testApple, location: [0, 2]};

      testSnake = new Snake(testHead, testSize, Direction.UP);
      testGame = new Game(testSnake, testSize, testApple);

      expect(testGame.isOver).toBe(false);

      testSnake.changeDirection(Direction.LEFT);
      testGame.nextFrame();

      expect(testGame.isOver).toBe(false);

      testGame.nextFrame();
      expect(testGame.isOver).toBe(false);

      testGame.nextFrame();
      expect(testGame.isOver).toBe(true);
    });
  });
});
