import {ReactWrapper} from 'enzyme';

import {setup, findByTestId} from '../../../test/utils';

import {GameGridRow} from './GameGridRow';

describe('<GameGridRow />', () => {
  let wrapper: ReactWrapper;
  let gameGridRowComponent: ReactWrapper;

  beforeEach(() => {
    wrapper = setup(GameGridRow);
    gameGridRowComponent = findByTestId(wrapper, 'component-game-grid-row');
  });
  it('renders without error', () => {
    expect(gameGridRowComponent.exists()).toBe(true);
  });
});
