import {SnakeErrors} from '../../common/errors';
import {Direction, TCoordinate} from '../../common/types';
import {coordsToString, coordToString} from '../../test/utils/testHelpers';

import {Snake} from './Snake';

describe('Snake', () => {
  let head: TCoordinate;
  let gridSize: number;
  let direction: Direction;

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
        caseHead: [5, 5] as TCoordinate,
        expectedSegments: [
          [5, 5],
          [6, 5],
          [7, 5],
        ] as TCoordinate[],
      },
      {
        caseDirection: Direction.DOWN,
        caseHead: [10, 10] as TCoordinate,
        expectedSegments: [
          [10, 10],
          [9, 10],
          [8, 10],
        ] as TCoordinate[],
      },
      {
        caseDirection: Direction.LEFT,
        caseHead: [8, 8] as TCoordinate,
        expectedSegments: [
          [8, 8],
          [8, 9],
          [8, 10],
        ] as TCoordinate[],
      },
      {
        caseDirection: Direction.RIGHT,
        caseHead: [14, 14] as TCoordinate,
        expectedSegments: [
          [14, 14],
          [14, 13],
          [14, 12],
        ] as TCoordinate[],
      },
    ].forEach(({caseDirection, caseHead, expectedSegments}) => {
      let formattedSegmentString: string = expectedSegments
        .map((segment: TCoordinate) => coordToString(segment))
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

        [Direction.LEFT, Direction.DOWN, Direction.RIGHT].forEach(
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

  describe('Snake.step', () => {
    head = [10, 10];
    gridSize = 21;

    [
      {
        initialDirection: Direction.UP,
        nextValues: [
          [9, 10],
          [10, 10],
          [11, 10],
        ],
      },
      {
        initialDirection: Direction.DOWN,
        nextValues: [
          [11, 10],
          [10, 10],
          [9, 10],
        ],
      },
      {
        initialDirection: Direction.LEFT,
        nextValues: [
          [10, 9],
          [10, 10],
          [10, 11],
        ],
      },
      {
        initialDirection: Direction.RIGHT,
        nextValues: [
          [10, 11],
          [10, 10],
          [10, 9],
        ],
      },
    ].forEach(({initialDirection, nextValues}) => {
      const nextCoordsString = coordsToString(nextValues as TCoordinate[]);
      it(`moves to ${nextCoordsString} when direction is set to ${initialDirection}`, () => {
        testSnake = new Snake(head, gridSize, initialDirection);
        testSnake.step();
        expect(testSnake.body).toEqual(nextValues);
      });
    });

    describe('when changing directions', () => {
      [
        {
          initialDirection: Direction.LEFT,
          nextDirection: Direction.UP,
          nextValues: [
            [9, 9],
            [10, 9],
            [10, 10],
          ],
        },
        {
          initialDirection: Direction.RIGHT,
          nextDirection: Direction.DOWN,
          nextValues: [
            [11, 11],
            [10, 11],
            [10, 10],
          ],
        },
        {
          initialDirection: Direction.DOWN,
          nextDirection: Direction.LEFT,
          nextValues: [
            [11, 9],
            [11, 10],
            [10, 10],
          ],
        },
        {
          initialDirection: Direction.UP,
          nextDirection: Direction.RIGHT,
          nextValues: [
            [9, 11],
            [9, 10],
            [10, 10],
          ],
        },
      ].forEach(({initialDirection, nextDirection, nextValues}) => {
        const nextValuesString = coordsToString(nextValues as TCoordinate[]);
        it(`it finishes with TCoordinates ${nextValuesString} after taking one step ${initialDirection} and another ${nextDirection}`, () => {
          testSnake = new Snake(head, gridSize, initialDirection);
          testSnake.step();

          testSnake.changeDirection(nextDirection);
          testSnake.step();

          expect(testSnake.body).toEqual(nextValues);
        });
      });

      [
        {
          initialDirection: Direction.LEFT,
          nextDirection: Direction.RIGHT,
        },
        {
          initialDirection: Direction.RIGHT,
          nextDirection: Direction.LEFT,
        },
        {
          initialDirection: Direction.DOWN,
          nextDirection: Direction.UP,
        },
        {
          initialDirection: Direction.UP,
          nextDirection: Direction.DOWN,
        },
      ].forEach(({initialDirection, nextDirection}) => {
        it('cannot turn back on itself', () => {
          testSnake = new Snake(head, gridSize, initialDirection);
          testSnake.step();

          testSnake.changeDirection(nextDirection);
          testSnake.step();

          expect(testSnake.direction).toEqual(initialDirection);
        });
      });
    });
  });

  describe('Snake.grow()', () => {
    it('adds another segment to itself on the next step (only)', () => {
      testSnake = new Snake(head, gridSize, direction);
      expect(testSnake.length).toBe(3);

      testSnake.grow();
      expect(testSnake.length).toBe(3);

      testSnake.step();
      expect(testSnake.length).toBe(4);

      testSnake.step();
      expect(testSnake.length).toBe(4);
    });
  });

  describe('wrapping around the grid', () => {
    [
      {
        direction: Direction.DOWN,
        caseHead: [10, 10],
        caseGridSize: 12,
        wrappedTCoordinates: [
          [0, 10],
          [11, 10],
          [10, 10],
        ],
      },
      {
        direction: Direction.UP,
        caseHead: [0, 2],
        caseGridSize: 5,
        wrappedTCoordinates: [
          [3, 2],
          [4, 2],
          [0, 2],
        ],
      },
      {
        direction: Direction.LEFT,
        caseHead: [84, 0],
        caseGridSize: 200,
        wrappedTCoordinates: [
          [84, 198],
          [84, 199],
          [84, 0],
        ],
      },
    ].forEach(({direction, caseHead, caseGridSize, wrappedTCoordinates}) => {
      it('wraps its TCoordinates around the boundaries of its gridSize', () => {
        testSnake = new Snake(caseHead as TCoordinate, caseGridSize, direction);
        testSnake.step();
        testSnake.step();

        expect(testSnake.body).toEqual(wrappedTCoordinates);
      });
    });
  });
});
