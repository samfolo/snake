import {GameElement} from '../../common/types';

import {renderGrid} from '../Grid/Grid';
import {Snake} from '../Snake/Snake';

export class Game {
  private _snake: Snake;
  private _grid: GameElement[][];

  constructor(snake: Snake, size: number) {
    this._snake = snake;
    this._grid = renderGrid(size, snake);
  }

  get grid() {
    return this._grid;
  }
}
