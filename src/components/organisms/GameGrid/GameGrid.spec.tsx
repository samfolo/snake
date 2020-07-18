import {ReactWrapper} from 'enzyme';

import {setup, findByTestId} from '../../../test/utils';

import {GameGrid} from './GameGrid';

describe('<GameGrid />', () => {
  let wrapper: ReactWrapper;
  let gameGridComponent: ReactWrapper;

  beforeEach(() => {
    wrapper = setup(GameGrid);
    gameGridComponent = findByTestId(wrapper, 'component-game-grid');
  });
  it('renders without error', () => {
    expect(gameGridComponent.exists()).toBe(true);
  });
});
