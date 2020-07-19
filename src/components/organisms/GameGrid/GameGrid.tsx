import React, {FunctionComponent} from 'react';
import classnames from 'classnames';

import {GameElement} from '../../../common/types';

import {GameGridCell} from '../../atoms/GameGridCell/GameGridCell';
import {GameGridRow} from '../../atoms/GameGridRow/GameGridRow';

import {GameGridContainer} from './styled';

export interface IGameGridProps {
  className?: string;
  data?: GameElement[][];
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
          {row.map((gameElement, cellIdx) => (
            <GameGridCell
              key={`game-grid__cell--${rowIdx}.${cellIdx}`}
              gameElement={gameElement}
            />
          ))}
        </GameGridRow>
      ))}
    </GameGridContainer>
  );
};
