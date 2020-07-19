import {isEqual} from 'lodash';

import {TApple, TCoordinate, AppleTier} from '../../common/types';
import {
  DEFAULT_APPLE_SCORE_POINTS,
  DEFAULT_SNAKE_GROWTH_POINTS,
  GROWTH_POINTS_FOR,
  MAXIMUM_GAME_SPEED,
  SCORE_POINTS_FOR,
} from '../../const';

import {Snake} from '../Snake/Snake';

export interface IGenerateAppleParams {
  size: number;
  snake: Snake;
  apple?: TApple | null;
  tier?: AppleTier;
  existingApple?: TCoordinate;
}

export type TGenerateApple = (paramObj: IGenerateAppleParams) => TApple;

export const generateApple: TGenerateApple = ({
  size,
  snake,
  apple,
  tier = AppleTier.DEFAULT,
  existingApple: existingAppleLocation,
}: IGenerateAppleParams) => {
  if (apple && !apple.init) return apple;

  const row: number = Math.floor(Math.random() * size);
  const col = Math.floor(Math.random() * size);

  if (
    !snake.body.some(
      ([segmentRow, segmentCol]: TCoordinate) => row === segmentRow && col === segmentCol
    ) &&
    !isEqual([row, col], existingAppleLocation)
  ) {
    return configureApple(tier, {
      location: [row, col],
      growthPoints: DEFAULT_SNAKE_GROWTH_POINTS,
      scorePoints: DEFAULT_APPLE_SCORE_POINTS,
      init: false,
    });
  } else {
    return generateApple({
      size,
      snake,
      apple,
      tier,
      existingApple: existingAppleLocation,
    });
  }
};

export const configureApple = (tier: AppleTier, apple: TApple) => {
  apple.growthPoints = GROWTH_POINTS_FOR[tier] ?? apple.growthPoints;
  apple.scorePoints = SCORE_POINTS_FOR[tier] ?? apple.scorePoints;
  return apple;
};

export const updateGameSpeed = (speed: number, points: number) => {
  const newSpeed = speed - Math.floor(points / 5) / 2;
  return Math.max(newSpeed, MAXIMUM_GAME_SPEED);
};
