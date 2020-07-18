import classnames from 'classnames';
import React, {FunctionComponent} from 'react';

import {ScoreDisplayContainer} from './styled';

export interface IScoreDisplayProps {
  className?: string;
  score: number;
}
export const ScoreDisplay: FunctionComponent<IScoreDisplayProps> = ({
  score,
  className,
}) => (
  <ScoreDisplayContainer
    className={classnames('score-display', className)}
    data-test-id="component-score-display"
  >
    {score}
  </ScoreDisplayContainer>
);
