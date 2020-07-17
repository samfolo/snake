import {Coordinate, Direction} from '../../common/types';

export class Snake {
  public segments: Coordinate[];
  public head: Coordinate;
  public gridSize: number;
  public direction: Direction;

  constructor(head: Coordinate, gridSize: number, direction: Direction) {
    this.head = head;

    const [row, col] = head;
    this.segments = [
      [row, col],
      [row - 1, col],
      [row - 2, col],
    ];
    this.gridSize = gridSize;
    this.direction = direction;
  }

  get length() {
    return this.segments.length;
  }
}
