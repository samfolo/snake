import React, {FunctionComponent} from 'react';
import classnames from 'classnames';

export interface IGamePageProps {
  className?: string;
}

export const GamePage: FunctionComponent<IGamePageProps> = ({
  children,
  className,
}) => (
  <div
    className={classnames('game_page', className)}
    data-test-id="component-game-page"
  >
    {children}
  </div>
);
