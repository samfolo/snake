import classnames from 'classnames';
import React, {FunctionComponent} from 'react';

import {ScoreDisplay} from '../../atoms/ScoreDisplay/ScoreDisplay';

import {ScorePanelContainer} from './styled';

export interface TScorePanelProps {
  className?: string;
  score: number;
}

export const ScorePanel: FunctionComponent<TScorePanelProps> = ({
  className,
  score,
}) => (
  <ScorePanelContainer
    className={classnames('score-panel', className)}
    data-test-id="component-score-panel"
  >
    <ScoreDisplay score={score} />
  </ScorePanelContainer>
);
