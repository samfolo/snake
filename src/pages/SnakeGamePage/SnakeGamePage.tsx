import React, {FunctionComponent} from 'react';

import {GamePage} from '../../components/GamePage/GamePage';

export const SnakeGamePage: FunctionComponent = () => (
  <GamePage data-test-id="snake-game-page" className="game_page--snake" />
);
