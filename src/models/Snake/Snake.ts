import {SnakeErrors} from '../../common/errors';
import {Coordinate, Direction} from '../../common/types';

import {getInitialSegments} from './utils';

export class Snake {
  private _segments: Coordinate[];
  private _head: Coordinate;
  private _gridSize: number;
  private _direction: Direction;

  constructor(
    head: Coordinate,
    gridSize: number,
    direction: Direction = Direction.UP
  ) {
    this._head = head;
    this._segments = getInitialSegments(head, direction);
    this._gridSize = gridSize;
    this._direction = direction;
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
    this._segments.pop();
    const nextHead = this.getNextHead() as Coordinate;
    this._head = nextHead;
    this._segments = [this._head, ...this._segments];
  }

  private getNextHead() {
    const [row, col] = this._head;

    switch (this._direction) {
      case Direction.UP:
        return [row - 1, col];
      case Direction.DOWN:
        return [row + 1, col];
      case Direction.LEFT:
        return [row, col - 1];
      case Direction.RIGHT:
        return [row, col + 1];
      default:
    }
  }
}
