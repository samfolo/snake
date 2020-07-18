import {SnakeErrors} from '../../common/errors';
import {TCoordinate, Direction} from '../../common/types';
import {mod} from '../../common/utils';

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

  changeDirection(newDirection: Direction) {
    if (Direction[newDirection] == null) throw SnakeErrors.INVALID_DIRECTION;
    this._direction = newDirection;
  }

  step() {
    if (this._growthPoints === 0) {
      this._segments.pop();
    } else {
      this._growthPoints -= 1;
    }

    const nextHead = this.getNextHead() as TCoordinate;
    this._head = nextHead;
    this._segments = [this._head, ...this._segments];
  }

  grow(amount: number = DEFAULT_GROWTH_POINTS) {
    this._growthPoints += amount;
  }

  private getNextHead() {
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
  }
}
