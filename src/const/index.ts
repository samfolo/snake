import {AppleTier, TAppleConfigValues} from '../common/types';

export const INITIAL_SNAKE_LENGTH = 3;

export const DEFAULT_APPLE_SCORE_POINTS = 5;
export const SHINY_APPLE_SCORE_POINTS = 20;

export const SCORE_POINTS_FOR: TAppleConfigValues = {
  [AppleTier.DEFAULT]: DEFAULT_APPLE_SCORE_POINTS,
  [AppleTier.SHINY]: SHINY_APPLE_SCORE_POINTS,
};

export const DEFAULT_SNAKE_GROWTH_POINTS = 1;
export const SHINY_APPLE_SNAKE_GROWTH_POINTS = 5;

export const GROWTH_POINTS_FOR: TAppleConfigValues = {
  [AppleTier.DEFAULT]: DEFAULT_SNAKE_GROWTH_POINTS,
  [AppleTier.SHINY]: SHINY_APPLE_SNAKE_GROWTH_POINTS,
};

export const MAXIMUM_GAME_SPEED = 10;

export const SHINY_APPLE_LIFESPAN_MS = 3500;
