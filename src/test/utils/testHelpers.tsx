import {ReactWrapper, mount} from 'enzyme';
import React, {ComponentType} from 'react';

import {Coordinate} from '../../common/types';

export type TSetup = <T>(
  Component: ComponentType<T>,
  props?: T
) => ReactWrapper;
export const setup: TSetup = <T extends {}>(
  Component: ComponentType<T>,
  props: T = {} as T
) => mount(<Component {...props} />);

export type TFindByTestId = (wrapper: ReactWrapper, id: string) => ReactWrapper;
export const findByTestId: TFindByTestId = (wrapper, id) =>
  wrapper.find(`[data-test-id="${id}"]`);

export const coordToString = ([row, col]: Coordinate) => `(${row}, ${col})`;
export const coordsToString = (coords: Coordinate[]) =>
  coords.map((coord) => coordToString(coord));
