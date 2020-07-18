import React, {FunctionComponent} from 'react';
import classnames from 'classnames';

import {GamePageContainer} from './styled';

export interface IGamePageProps {
  className?: string;
}

export const GamePage: FunctionComponent<IGamePageProps> = ({
  children,
  className,
}) => (
  <GamePageContainer
    className={classnames('game_page', className)}
    data-test-id="component-game-page"
  >
    {children}
  </GamePageContainer>
);
