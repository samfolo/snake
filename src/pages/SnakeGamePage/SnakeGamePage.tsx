import React, {FunctionComponent, useState} from 'react';

import {TCoordinate, Direction} from '../../common/types';
import {useInterval} from '../../common/utils';
import {ScorePanel} from '../../components/molecules/ScorePanel/ScorePanel';
import {GameContainer} from '../../components/atoms/Containers/styled';
import {GameGrid} from '../../components/organisms/GameGrid/GameGrid';
import {GamePage} from '../../components/organisms/GamePage/GamePage';
import {Game} from '../../models/Game/Game';
import {Snake} from '../../models/Snake/Snake';

const initialGridSize: number = 30; // TODO: set in menu

const middle = Math.floor(initialGridSize / 2) - 1;
const initialHead: TCoordinate = [middle, middle]; // TODO: set in menu

const initialSnake: Snake = new Snake(
  initialHead,
  initialGridSize,
  Direction.UP
);

export const SnakeGamePage: FunctionComponent = () => {
  const [game, setGame] = useState<Game>(
    new Game(initialSnake, initialGridSize)
  );
  const [frameCount, updateFrameCount] = useState(0);

  useInterval(
    () => {
      game.nextFrame();
      updateFrameCount((frameCount) => frameCount + 1);
    },
    50,
    game.isOver
  );

  return (
    <GamePage data-test-id="snake-game-page" className="game-page__snake">
      <GameContainer>
        <ScorePanel score={game?.score} />
        <GameGrid data={game?.grid} />
      </GameContainer>
    </GamePage>
  );
};
