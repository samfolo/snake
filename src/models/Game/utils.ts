import {TApple, TCoordinate} from '../../common/types';
import {
  DEFAULT_APPLE_SCORE_POINTS,
  DEFAULT_SNAKE_GROWTH_POINTS,
  MAXIMUM_GAME_SPEED,
} from '../../const';

import {Snake} from '../Snake/Snake';

export type TGenerateApple = (
  size: number,
  snake: Snake,
  apple?: TApple
) => TApple;

export const generateApple: TGenerateApple = (size, snake, apple) => {
  if (apple && !apple.init) return apple;

  const row: number = Math.floor(Math.random() * size);
  const col = Math.floor(Math.random() * size);

  if (
    !snake.body.some(
      ([segmentRow, segmentCol]: TCoordinate) =>
        row === segmentRow && col === segmentCol
    )
  ) {
    return {
      location: [row, col],
      growthPoints: DEFAULT_SNAKE_GROWTH_POINTS,
      scorePoints: DEFAULT_APPLE_SCORE_POINTS,
      init: false,
    };
  } else {
    return generateApple(size, snake);
  }
};

export const updateGameSpeed = (speed: number, points: number) => {
  const newSpeed = speed - Math.floor(points / 5) / 2;
  return Math.max(newSpeed, MAXIMUM_GAME_SPEED);
};
