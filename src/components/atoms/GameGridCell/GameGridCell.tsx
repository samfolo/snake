import classnames from 'classnames';
import React, {FunctionComponent} from 'react';

import {GameElement} from '../../../common/types';

import {GameGridCellContainer} from './styled';

export interface IGameGridCellProps {
  className?: string;
  gameElement: GameElement;
}

export const GameGridCell: FunctionComponent<IGameGridCellProps> = ({
  className,
  gameElement,
}) => (
  <GameGridCellContainer
    gameElement={gameElement}
    className={classnames('game-grid__cell', className)}
    data-test-id="component-game-grid-cell"
  />
);
