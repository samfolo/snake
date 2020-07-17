import {Snake} from './Snake';
import {Direction, Coordinate} from '../../common/types';

describe('Snake', () => {
  let head: Coordinate = [10, 10];
  let gridSize: number = 21;
  let direction: Direction = Direction.UP;

  let testSnake: Snake;

  it('is initially three cells long', () => {
    head = [10, 10];
    gridSize = 21;
    direction = Direction.UP;

    testSnake = new Snake(head, gridSize, direction);

    expect(testSnake.length).toBe(3);
  });
});
