import {GameElement, TApple} from '../../common/types';

import {renderGrid} from '../Grid/Grid';
import {Snake} from '../Snake/Snake';

import {generateApple} from './utils';

export class Game {
  private _snake: Snake;
  private _size: number;
  private _grid: GameElement[][];
  private _apple: TApple;

  constructor(
    snake: Snake,
    size: number,
    apple: TApple = {location: [0, 0], points: 1, init: true}
  ) {
    this._snake = snake;
    this._size = size;
    this._apple = generateApple(size, snake, apple);
    this._grid = renderGrid(size, snake, this._apple);
  }

  get grid() {
    return this._grid;
  }

  get apple() {
    return this._apple;
  }

  get snake() {
    return this._snake;
  }

  nextFrame = () => {
    const prevSnake = this._snake;
    this._snake.step();

    const [headRow, headCol] = this._snake.head;
    this.updateSnakePosition(headRow, headCol, prevSnake);

    const [appleRow, appleCol] = this._apple.location;
    if (appleRow === headRow && appleCol === headCol) {
      // TODO: increment score here ...

      this._snake.grow(this._apple.points);
      this.generateNewApple();
    }
  };

  private updateSnakePosition = (
    headRow: number,
    headCol: number,
    prevSnake: Snake
  ) => {
    this._grid[headRow][headCol] = GameElement.SNAKE_SEGMENT;

    const [tailRow, tailCol] = prevSnake.tail;
    this._grid[tailRow][tailCol] = GameElement.EMPTY_SPACE;
  };

  private generateNewApple = () => {
    this._apple = generateApple(this._size, this._snake);
    const [newAppleRow, newAppleCol] = this._apple.location;
    this._grid[newAppleRow][newAppleCol] = GameElement.APPLE;
  };
}
