import styled from 'styled-components';

import {GameElement} from '../../../common/types';

export interface IGameGridCellContainerProps {
  gameElement: GameElement;
}
export const GameGridCellContainer = styled('div')<IGameGridCellContainerProps>`
  width: 10px;
  height: 10px;
  background: ${({gameElement}) =>
    ({
      [GameElement.SNAKE_SEGMENT]: 'green',
      [GameElement.APPLE]: 'white',
      [GameElement.EMPTY_SPACE]: 'darkgrey',
    }[gameElement] || 'red')};
`;
