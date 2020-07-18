import {Snake} from '../Snake/Snake';
import {TApple, TCoordinate} from '../../common/types';

export const generateApple = (size: number, snake: Snake): TApple => {
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
