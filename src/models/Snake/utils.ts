import {SnakeErrors} from '../../common/errors';
import {TCoordinate, Direction} from '../../common/types';

export const getInitialSegments = (
  [row, col]: TCoordinate,
  direction: Direction
): TCoordinate[] => {
  switch (direction) {
    case Direction.UP:
      return [
        [row, col],
        [row + 1, col],
        [row + 2, col],
      ];
    case Direction.DOWN:
      return [
        [row, col],
        [row - 1, col],
        [row - 2, col],
      ];
    case Direction.LEFT:
      return [
        [row, col],
        [row, col + 1],
        [row, col + 2],
      ];
    case Direction.RIGHT:
      return [
        [row, col],
        [row, col - 1],
        [row, col - 2],
      ];
    default:
      throw SnakeErrors.INVALID_SNAKE;
  }
};
