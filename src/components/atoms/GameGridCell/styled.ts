import styled from 'styled-components';

import {GameElement} from '../../../common/types';

export interface IGameGridCellContainerProps {
  gameElement: GameElement;
}
export const GameGridCellContainer = styled('div')<IGameGridCellContainerProps>`
  width: 10px;
  height: 10px;
  background: ${(p) =>
    ({
      [GameElement.SNAKE_SEGMENT]: p.theme.palette.paletteSecondary,
      [GameElement.APPLE]: p.theme.palette.paletteAccent,
      [GameElement.EMPTY_SPACE]: p.theme.palette.primaryTintQuarter,
    }[p.gameElement] || 'red')};
`;
