import {ReactWrapper, mount} from 'enzyme';
import React, {ComponentType} from 'react';

import {TCoordinate} from '../../common/types';

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

export const coordToString = ([row, col]: TCoordinate) => `(${row}, ${col})`;
export const coordsToString = (coords: TCoordinate[]) =>
  coords.map((coord) => coordToString(coord));
