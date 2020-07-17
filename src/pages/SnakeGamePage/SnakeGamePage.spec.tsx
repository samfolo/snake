import {ReactWrapper} from 'enzyme';
import {setup, findByTestId} from '../../test/utils';
import {SnakeGamePage} from './SnakeGamePage';

describe('<SnakeGamePage />', () => {
  let wrapper: ReactWrapper;
  let snakeGamePageComponent: ReactWrapper;

  beforeEach(() => {
    wrapper = setup(SnakeGamePage);
    snakeGamePageComponent = findByTestId(wrapper, 'snake-game-page');
  });

  it('renders without error', () => {
    expect(snakeGamePageComponent).toHaveLength(1);
  });
});
