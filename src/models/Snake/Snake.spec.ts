import {Snake} from './Snake';
import {Direction, Coordinate} from '../../common/types';

describe('Snake', () => {
  let head: Coordinate = [10, 10];
  let gridSize: number = 21;
  let direction: Direction = Direction.UP;

  let testSnake: Snake;
  beforeEach(() => {
    head = [10, 10];
    gridSize = 21;
    direction = Direction.UP;

    testSnake = new Snake(head, gridSize, direction);
  });
  it('is initially three cells long', () => {
    expect(testSnake.length).toBe(3);
  });

  describe('Snake.direction', () => {
    it('has a default direction of UP', () => {
      expect(testSnake.direction).toEqual(Direction.UP);
    });

    [Direction.UP, Direction.DOWN, Direction.LEFT, Direction.RIGHT].forEach(
      (enumOption) => {
        it(`has a direction of ${enumOption} if passed as an argument`, () => {
          testSnake = new Snake(head, gridSize, enumOption);
          expect(testSnake.direction).toEqual(enumOption);
        });
      }
    );
  });
});
