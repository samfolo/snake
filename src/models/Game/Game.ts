import {isEqual} from 'lodash';

import {AppleTier, GameElement, TApple, TCoordinate} from '../../common/types';
import {
  DEFAULT_APPLE_SCORE_POINTS,
  DEFAULT_SNAKE_GROWTH_POINTS,
  SHINY_APPLE_LIFESPAN_MS,
} from '../../const';

import {renderGrid} from '../Grid/Grid';
import {Snake} from '../Snake/Snake';

import {generateApple, updateGameSpeed} from './utils';

export class Game {
  private _snake: Snake;
  private _size: number;
  private _grid: GameElement[][];
  private _apple: TApple;
  private _shinyApple: TApple | null;
  private _shinyAppleTimeout: number;
  private _isOver: boolean;
  private _score: number;
  private _speed: number;

  constructor(
    snake: Snake,
    size: number,
    apple: TApple = {
      location: [0, 0],
      growthPoints: DEFAULT_SNAKE_GROWTH_POINTS,
      scorePoints: DEFAULT_APPLE_SCORE_POINTS,
      init: true,
    },
    speed: number = 80
  ) {
    this._snake = snake;
    this._size = size;
    this._apple = generateApple({size, snake, apple});
    this._grid = renderGrid(size, snake, this._apple);

    this._score = 0;
    this._isOver = false;
    this._speed = speed;
    this._shinyApple = null;
    this._shinyAppleTimeout = 0;
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

  get speed() {
    return this._speed;
  }

  nextFrame = () => {
    const prevTail: TCoordinate = this._snake.tail;
    this._snake.step();

    if (this._snake.hasCrashed) {
      this._isOver = true;
      return false;
    }

    this.updateSnakePosition(this._snake.head, prevTail);

    if (isEqual(this._snake.head, this._apple.location)) this.consumeApple();
    if (isEqual(this._snake.head, this._shinyApple?.location)) this.consumeShinyApple();
  };

  private updateSnakePosition = (newHead: TCoordinate, prevTail: TCoordinate) => {
    const [nextHeadRow, nextHeadCol] = newHead;
    this._grid[nextHeadRow][nextHeadCol] = GameElement.SNAKE_SEGMENT;

    const [prevTailRow, prevTailCol] = prevTail;
    this._grid[prevTailRow][prevTailCol] = GameElement.EMPTY_SPACE;
  };

  private generateNewApple = () => {
    this._apple = generateApple({
      size: this._size,
      snake: this._snake,
      tier: AppleTier.DEFAULT,
      existingApple: this._shinyApple?.location,
    });

    const [newAppleRow, newAppleCol] = this._apple.location;
    this._grid[newAppleRow][newAppleCol] = GameElement.APPLE;
  };

  private generateNewShinyApple = () => {
    if (this.isLucky() && !this._shinyApple) {
      this._shinyApple = generateApple({
        size: this._size,
        snake: this._snake,
        tier: AppleTier.SHINY,
        existingApple: this._apple.location,
      });

      const [shinyAppleRow, shinyAppleCol] = this._shinyApple.location;
      this._grid[shinyAppleRow][shinyAppleCol] = GameElement.SHINY_APPLE;

      this._shinyAppleTimeout = setTimeout(() => {
        this._grid[shinyAppleRow][shinyAppleCol] = GameElement.EMPTY_SPACE;
        this._shinyApple = null;
      }, SHINY_APPLE_LIFESPAN_MS);
    }
  };

  private consumeApple = () => {
    this._score += this._apple.scorePoints;
    this._speed = updateGameSpeed(this._speed, this._apple.scorePoints);
    this._snake.grow(this._apple.growthPoints);

    this.generateNewApple();
    this.generateNewShinyApple();
  };

  private consumeShinyApple = () => {
    if (this._shinyApple) {
      clearTimeout(this._shinyAppleTimeout);

      this._score += this._shinyApple.scorePoints;
      this._speed = updateGameSpeed(this._speed, this._shinyApple.scorePoints);
      this._snake.grow(this._shinyApple.growthPoints);
      this._shinyApple = null;

      this.generateNewShinyApple();
    }
  };

  private isLucky = () => Math.floor(Math.random() * 10) < 2;
}
