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
    if (Direction[newDirection] == null) {
      throw SnakeErrors.INVALID_DIRECTION;
    }

    this._direction = newDirection;
  }
}
