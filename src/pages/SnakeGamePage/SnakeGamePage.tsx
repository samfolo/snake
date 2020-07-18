import React, {FunctionComponent, useState} from 'react';

import {TCoordinate, Direction} from '../../common/types';
import {useInterval} from '../../common/utils';
import {GameGrid} from '../../components/organisms/GameGrid/GameGrid';
import {GamePage} from '../../components/organisms/GamePage/GamePage';
import {Game} from '../../models/Game/Game';
import {Snake} from '../../models/Snake/Snake';

const initialHead: TCoordinate = [10, 10]; // TODO: set in menu
const initialGridSize: number = 21; // TODO: set in menu

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
    60,
    game.isOver
  );

  return (
    <GamePage data-test-id="snake-game-page" className="game_page--snake">
      <GameGrid data={game?.grid} />
    </GamePage>
  );
};
