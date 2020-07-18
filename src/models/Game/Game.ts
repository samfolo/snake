import {GameElement, TApple} from '../../common/types';

import {renderGrid} from '../Grid/Grid';
import {Snake} from '../Snake/Snake';

import {generateApple} from './utils';

export class Game {
  private _snake: Snake;
  private _grid: GameElement[][];
  private _apple: TApple;

  constructor(snake: Snake, size: number) {
    this._snake = snake;
    this._apple = generateApple(size, snake);
    this._grid = renderGrid(size, snake);
  }

  get grid() {
    return this._grid;
  }

  get apple() {
    return this._apple;
  }
}
