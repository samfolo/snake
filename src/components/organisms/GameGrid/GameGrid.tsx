import React, {FunctionComponent} from 'react';
import classnames from 'classnames';

import {GameGridCell} from '../../atoms/GameGridCell/GameGridCell';
import {GameGridRow} from '../../atoms/GameGridRow/GameGridRow';

import {GameGridContainer} from './styled';

export interface IGameGridProps {
  className?: string;
  data?: any[][]; // TODO: type this properly
}

export const GameGrid: FunctionComponent<IGameGridProps> = ({
  className,
  data,
}) => {
  return (
    <GameGridContainer
      className={classnames('game-grid', className)}
      data-test-id="component-game-grid"
    >
      {data?.map((row, rowIdx) => (
        <GameGridRow key={`game-grid__row--${rowIdx}`}>
          {row.map((cell, cellIdx) => (
            <GameGridCell key={`game-grid__cell--${rowIdx}.${cellIdx}`} />
          ))}
        </GameGridRow>
      ))}
    </GameGridContainer>
  );
};
