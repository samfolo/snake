import {GameElement} from '../../common/types';

import {Snake} from '../Snake/Snake';

export const renderGrid = (size: number, snake: Snake): GameElement[][] => {
  let grid: GameElement[][] = [];

  for (let row = 0; row < size; row++) {
    let row: GameElement[] = [];
    for (let col = 0; col < size; col++) {
      row.push(GameElement.EMPTY_SPACE);
    }
    grid.push(row);
  }

  for (let i = 0; i < snake.length; i++) {
    let [row, col] = snake.body[i];
    grid[row][col] = GameElement.SNAKE_SEGMENT;
  }

  return grid;
};
