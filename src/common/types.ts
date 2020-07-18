export type Coordinate = [number, number];
export enum Direction {
  LEFT = 'LEFT',
  RIGHT = 'RIGHT',
  UP = 'UP',
  DOWN = 'DOWN',
}
export enum GameElement {
  EMPTY_SPACE = 0,
  SNAKE_SEGMENT = 1,
  APPLE = 2,
}
