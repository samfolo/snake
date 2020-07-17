import React, {FunctionComponent} from 'react';
import classnames from 'classnames';

import {GameGridContainer} from './styled';

export interface IGameGridProps {
  className?: string;
}

export const GameGrid: FunctionComponent<IGameGridProps> = ({className}) => (
  <GameGridContainer
    className={classnames('game-grid', className)}
    data-test-id="component-game-grid"
  />
);
