import {Coordinate, Direction} from '../../common/types';

export class Snake {
  private _segments: Coordinate[];
  private _head: Coordinate;
  private _gridSize: number;
  private _direction: Direction;

  constructor(head: Coordinate, gridSize: number, direction: Direction) {
    this._head = head;

    const [row, col] = head;
    this._segments = [
      [row, col],
      [row - 1, col],
      [row - 2, col],
    ];
    this._gridSize = gridSize;
    this._direction = direction;
  }

  get length() {
    return this._segments.length;
  }

  get direction() {
    return this._direction;
  }
}
