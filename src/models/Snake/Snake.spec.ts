import {SnakeErrors} from '../../common/errors';
import {Direction, Coordinate} from '../../common/types';
import {coordToString} from '../../test/utils/testHelpers';

import {Snake} from './Snake';

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
      const defaultSnake = new Snake(head, gridSize);
      expect(defaultSnake.direction).toEqual(Direction.UP);
    });

    [
      {
        caseDirection: Direction.UP,
        caseHead: [5, 5] as Coordinate,
        expectedSegments: [
          [5, 5],
          [4, 5],
          [3, 5],
        ] as Coordinate[],
      },
      {
        caseDirection: Direction.DOWN,
        caseHead: [10, 10] as Coordinate,
        expectedSegments: [
          [10, 10],
          [11, 10],
          [12, 10],
        ] as Coordinate[],
      },
      {
        caseDirection: Direction.LEFT,
        caseHead: [8, 8] as Coordinate,
        expectedSegments: [
          [8, 8],
          [8, 9],
          [8, 10],
        ] as Coordinate[],
      },
      {
        caseDirection: Direction.RIGHT,
        caseHead: [14, 14] as Coordinate,
        expectedSegments: [
          [14, 14],
          [14, 13],
          [14, 12],
        ] as Coordinate[],
      },
    ].forEach(({caseDirection, caseHead, expectedSegments}) => {
      let formattedSegmentString: string = expectedSegments
        .map((segment: Coordinate) => coordToString(segment))
        .join(', ');

      it(`has a direction of ${caseDirection} if passed as an argument`, () => {
        testSnake = new Snake(caseHead, gridSize, caseDirection);
        expect(testSnake.direction).toEqual(caseDirection);
      });

      it(`has segments ${formattedSegmentString} when passed ${caseDirection} and a head of ${caseHead}`, () => {
        testSnake = new Snake(caseHead, gridSize, caseDirection);
        expect(testSnake.body).toEqual(expectedSegments);
      });
    });

    describe('changing directions', () => {
      it('updates its direction when passed one via changeDirection()', () => {
        expect(testSnake.direction).toEqual(Direction.UP);

        [Direction.DOWN, Direction.LEFT, Direction.RIGHT].forEach(
          (enumOption) => {
            testSnake.changeDirection(enumOption);
            expect(testSnake.direction).toEqual(enumOption);
          }
        );
      });

      it('does not update its direction if the argument is not an accepted direction', () => {
        expect(() => testSnake.changeDirection('FORWARD' as Direction)).toThrow(
          SnakeErrors.INVALID_DIRECTION
        );
      });
    });
  });

  describe('Snake.step', () => {});
});
