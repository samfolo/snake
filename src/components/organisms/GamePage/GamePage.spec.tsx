import {ReactWrapper} from 'enzyme';
import {setup, findByTestId} from '../../../test/utils';
import {GamePage} from './GamePage';

describe('<GamePage />', () => {
  let wrapper: ReactWrapper;
  let gamePageComponent: ReactWrapper;
  const DEFAULT_PROPS = {
    className: 'test-game-page',
  };

  beforeEach(() => {
    wrapper = setup(GamePage, DEFAULT_PROPS);
    gamePageComponent = findByTestId(wrapper, 'component-game-page');
  });

  it('renders without error', () => {
    expect(gamePageComponent.exists()).toBe(true);
  });
});
