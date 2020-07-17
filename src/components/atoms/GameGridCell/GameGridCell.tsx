import classnames from 'classnames';
import React, {FunctionComponent} from 'react';

import {GameGridCellContainer} from './styled';

export interface IGameGridCellProps {
  className?: string;
}

export const GameGridCell: FunctionComponent<IGameGridCellProps> = ({
  className,
}) => (
  <GameGridCellContainer
    className={classnames('game-grid__cell', className)}
    data-test-id="component-game-grid-cell"
  />
);
