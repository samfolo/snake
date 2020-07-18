import {Snake} from '../Snake/Snake';
import {TApple, TCoordinate} from '../../common/types';

export type TGenerateApple = (
  size: number,
  snake: Snake,
  apple?: TApple
) => TApple;

export const generateApple: TGenerateApple = (size, snake, apple) => {
  if (apple?.init) return apple;

  const row: number = Math.floor(Math.random() * size);
  const col = Math.floor(Math.random() * size);

  if (
    !snake.body.some(
      ([segmentRow, segmentCol]: TCoordinate) =>
        row === segmentRow && col === segmentCol
    )
  ) {
    return {location: [row, col], points: 1};
  } else {
    return generateApple(size, snake);
  }
};
