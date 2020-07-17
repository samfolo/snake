export interface ISnakeErrors {
  INVALID_DIRECTION: Error;
  INVALID_SNAKE: Error;
}

export const SnakeErrors: ISnakeErrors = {
  INVALID_DIRECTION: new Error('Invalid Direction'),
  INVALID_SNAKE: new Error('Invalid Snake'),
};
