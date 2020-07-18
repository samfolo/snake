import React, {FunctionComponent, useState} from 'react';

import {TCoordinate} from '../../common/types';
import {useInterval} from '../../common/utils';
import {GameGrid} from '../../components/organisms/GameGrid/GameGrid';
import {GamePage} from '../../components/organisms/GamePage/GamePage';
import {Game} from '../../models/Game/Game';
import {Snake} from '../../models/Snake/Snake';

const initialHead: TCoordinate = [10, 10]; // TODO: set in menu
const initialGridSize: number = 21; // TODO: seet in menu

const initialSnake: Snake = new Snake(initialHead, initialGridSize);

export const SnakeGamePage: FunctionComponent = () => {
  const [game, setGame] = useState<Game>(
    new Game(initialSnake, initialGridSize)
  );
  const [frameCount, updateFrame] = useState(0);

  useInterval(() => {
    game.nextFrame();
    updateFrame((frameCount) => frameCount + 1);
  }, 100);

  return (
    <GamePage data-test-id="snake-game-page" className="game_page--snake">
      <GameGrid data={game?.grid} />
    </GamePage>
  );
};
