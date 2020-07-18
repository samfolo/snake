import {KEY_UP, KEY_DOWN, KEY_LEFT, KEY_RIGHT} from 'keycode-js';

import {SnakeErrors} from '../../common/errors';
import {TCoordinate, Direction} from '../../common/types';
import {mod, oppositeDirection} from '../../common/utils';

import {getInitialSegments} from './utils';

export const DEFAULT_GROWTH_POINTS = 1;

export class Snake {
  private _segments: TCoordinate[];
  private _head: TCoordinate;
  private _gridSize: number;
  private _direction: Direction;
  private _growthPoints: number;

  constructor(
    head: TCoordinate,
    gridSize: number,
    direction: Direction = Direction.UP
  ) {
    this._head = head;
    this._segments = getInitialSegments(head, direction);
    this._gridSize = gridSize;
    this._direction = direction;
    this._growthPoints = 0;

    window.addEventListener('keydown', this);
  }

  get length() {
    return this._segments.length;
  }

  get direction() {
    return this._direction;
  }

  get body() {
    return this._segments;
  }

  get head() {
    return this._head;
  }

  get tail() {
    return this._segments[this._segments.length - 1];
  }

  changeDirection = (newDirection: Direction) => {
    if (!Direction[newDirection]) throw SnakeErrors.INVALID_DIRECTION;
    if (newDirection !== oppositeDirection(this._direction)) {
      console.log(newDirection, this._direction);
      this._direction = newDirection;
    }
  };

  step = () => {
    if (this._growthPoints === 0) {
      this._segments.pop();
    } else {
      this._growthPoints -= 1;
    }

    const nextHead = this.getNextHead() as TCoordinate;
    this._head = nextHead;
    this._segments = [this._head, ...this._segments];
  };

  grow = (amount: number = DEFAULT_GROWTH_POINTS) => {
    this._growthPoints += amount;
  };

  handleEvent = (e: KeyboardEvent) => {
    e.preventDefault();

    switch (e.type) {
      case 'keydown':
        const handleKeydown = this.directions.get(e.keyCode);
        if (handleKeydown) handleKeydown();
        break;
      default:
        return false;
    }
  };

  private getNextHead = () => {
    const [row, col] = this._head;

    switch (this._direction) {
      case Direction.UP:
        return [mod(row - 1, this._gridSize), col];
      case Direction.DOWN:
        return [mod(row + 1, this._gridSize), col];
      case Direction.LEFT:
        return [row, mod(col - 1, this._gridSize)];
      case Direction.RIGHT:
        return [row, mod(col + 1, this._gridSize)];
      default:
    }
  };

  private directions = new Map<number, () => void>()
    .set(KEY_RIGHT, () => this.changeDirection(Direction.RIGHT))
    .set(KEY_LEFT, () => this.changeDirection(Direction.LEFT))
    .set(KEY_UP, () => this.changeDirection(Direction.UP))
    .set(KEY_DOWN, () => this.changeDirection(Direction.DOWN));
}
