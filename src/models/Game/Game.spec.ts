import {GameElement} from '../../common/types';
import {Snake} from '../Snake/Snake';

import {Game} from './Game';

describe('Game', () => {
  let testGame: Game;
  let mockSnake: Snake;
  let size: number = 21;

  beforeEach(() => {
    mockSnake = {
      body: [
        [10, 10],
        [10, 9],
        [10, 8],
      ],
    } as Snake;
    testGame = new Game(mockSnake, size);
  });

  it('renders a grid', () => {
    expect(testGame.grid).toHaveLength(size);
    testGame.grid.forEach((row: GameElement[]) => {
      expect(row).toHaveLength(size);
    });
  });

  describe('a GameElement.APPLE', () => {
    it('is randomly generated on its grid', () => {
      const [row, col] = testGame.apple.location;
      expect(row >= 0 && row < size).toBe(true);
      expect(col >= 0 && col < size).toBe(true);
    });

    it('is never generated over a snake segment', () => {
      const {location} = testGame.apple;
      expect(mockSnake.body).not.toContain(location);
    });
  });
});
