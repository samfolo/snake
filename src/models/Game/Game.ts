import {GameElement, TApple, TCoordinate} from '../../common/types';
import {
  DEFAULT_APPLE_SCORE_POINTS,
  DEFAULT_SNAKE_GROWTH_POINTS,
} from '../../const';

import {renderGrid} from '../Grid/Grid';
import {Snake} from '../Snake/Snake';

import {generateApple} from './utils';

export class Game {
  private _snake: Snake;
  private _size: number;
  private _grid: GameElement[][];
  private _apple: TApple;
  private _isOver: boolean;
  private _score: number;

  constructor(
    snake: Snake,
    size: number,
    apple: TApple = {
      location: [0, 0],
      growthPoints: DEFAULT_SNAKE_GROWTH_POINTS,
      scorePoints: DEFAULT_APPLE_SCORE_POINTS,
      init: true,
    }
  ) {
    this._snake = snake;
    this._size = size;
    this._apple = generateApple(size, snake, apple);
    this._grid = renderGrid(size, snake, this._apple);

    this._score = 0;
    this._isOver = false;
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

  get isOver() {
    return this._isOver;
  }

  get score() {
    return this._score;
  }

  nextFrame = () => {
    const prevTail: TCoordinate = this._snake.tail;
    this._snake.step();

    if (this._snake.hasCrashed) {
      this._isOver = true;
      return false;
    }

    const [headRow, headCol] = this._snake.head;
    this.updateSnakePosition(headRow, headCol, prevTail);

    const [appleRow, appleCol] = this._apple.location;
    if (appleRow === headRow && appleCol === headCol) {
      this._score += this._apple.scorePoints;
      this._snake.grow(this._apple.growthPoints);
      this.generateNewApple();
    }
  };

  private updateSnakePosition = (
    headRow: number,
    headCol: number,
    prevTail: TCoordinate
  ) => {
    this._grid[headRow][headCol] = GameElement.SNAKE_SEGMENT;

    const [tailRow, tailCol] = prevTail;
    this._grid[tailRow][tailCol] = GameElement.EMPTY_SPACE;
  };

  private generateNewApple = () => {
    this._apple = generateApple(this._size, this._snake);
    const [newAppleRow, newAppleCol] = this._apple.location;
    this._grid[newAppleRow][newAppleCol] = GameElement.APPLE;
  };
}
