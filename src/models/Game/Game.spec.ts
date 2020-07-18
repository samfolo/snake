import {GameElement} from '../../common/types';
import {Snake} from '../Snake/Snake';

import {Game} from './Game';

describe('Game', () => {
  let testGame: Game;
  let mockSnake = {
    body: [
      [10, 10],
      [10, 9],
      [10, 8],
    ],
  } as Snake;
  let size: number = 21;

  beforeEach(() => {
    testGame = new Game(mockSnake, size);
  });
  it('renders a grid', () => {
    expect(testGame.grid).toHaveLength(size);
    testGame.grid.forEach((row: GameElement[]) => {
      expect(row).toHaveLength(size);
    });
  });
});
