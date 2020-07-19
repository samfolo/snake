export type TApple = {
  location: TCoordinate;
  growthPoints: number;
  scorePoints: number;
  init?: boolean;
};
export type TCoordinate = [number, number];

export type TAppleConfigValues = {
  [s in AppleTier]?: number;
};

export type TEntries<T> = {
  [K in keyof T]: [K, T[K]];
}[keyof T][];

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
  SHINY_APPLE = 3,
}

export enum AppleTier {
  DEFAULT = 'DEFAULT',
  SHINY = 'SHINY',
}
