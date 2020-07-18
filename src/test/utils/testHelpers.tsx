import {ReactWrapper, mount} from 'enzyme';
import React, {ComponentType} from 'react';
import {ThemeProvider} from 'styled-components';

import {TCoordinate} from '../../common/types';
import {theme} from '../../theme';

export type TSetup = <T>(
  Component: ComponentType<T>,
  props?: T
) => ReactWrapper;
export const setup: TSetup = <T extends {}>(
  Component: ComponentType<T>,
  props: T = {} as T
) =>
  mount(
    <ThemeProvider theme={theme}>
      <Component {...props} />
    </ThemeProvider>
  );

export type TFindByTestId = (wrapper: ReactWrapper, id: string) => ReactWrapper;
export const findByTestId: TFindByTestId = (wrapper, id) =>
  wrapper.find(`[data-test-id="${id}"]`);

export const coordToString = ([row, col]: TCoordinate) => `(${row}, ${col})`;
export const coordsToString = (coords: TCoordinate[]) =>
  coords.map((coord) => coordToString(coord));
