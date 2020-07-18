import {GameElement, TApple} from '../../common/types';

import {Snake} from '../Snake/Snake';

export type TRenderGrid = (
  size: number,
  snake: Snake,
  apple?: TApple
) => GameElement[][];

export const renderGrid: TRenderGrid = (size, snake, apple) => {
  const grid: GameElement[][] = [];

  for (let row = 0; row < size; row++) {
    let row: GameElement[] = [];
    for (let col = 0; col < size; col++) {
      row.push(GameElement.EMPTY_SPACE);
    }
    grid.push(row);
  }

  for (let i = 0; i < snake.length; i++) {
    const [row, col] = snake.body[i];
    grid[row][col] = GameElement.SNAKE_SEGMENT;
  }

  if (apple) {
    const [row, col] = apple.location;
    grid[row][col] = GameElement.APPLE;
  }

  return grid;
};
