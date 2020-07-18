import {GameElement, TApple} from '../../common/types';

import {renderGrid} from '../Grid/Grid';
import {Snake} from '../Snake/Snake';

import {generateApple} from './utils';

export class Game {
  private _snake: Snake;
  private _grid: GameElement[][];
  private readonly _apple: TApple;

  constructor(
    snake: Snake,
    size: number,
    apple: TApple = {location: [0, 0], points: 1, init: true}
  ) {
    this._snake = snake;
    this._apple = generateApple(size, snake, apple);
    this._grid = renderGrid(size, snake, this._apple);
  }

  get grid() {
    return this._grid;
  }

  get apple() {
    return this._apple;
  }
}
