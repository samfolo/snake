import React, {FunctionComponent, memo} from 'react';
import classnames from 'classnames';

import {RowContainer} from './styled';

export interface IGameGridRowProps {
  className?: string;
}

export const GameGridRow: FunctionComponent<IGameGridRowProps> = memo(
  ({className, children}) => (
    <RowContainer
      className={classnames('game-grid__row', className)}
      data-test-id="component-game-grid-row"
    >
      {children}
    </RowContainer>
  )
);
