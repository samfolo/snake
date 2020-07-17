import React, { FunctionComponent } from 'react';
import classnames from 'classnames';

export interface IGamePageProps {
  className?: string;
}

export const GamePage: FunctionComponent<IGamePageProps> = ({ className }) => (
  <div
    className={classnames('game-page', className)}
    data-test-id="component-game-page"
  />
);
