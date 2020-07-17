import {App} from './App';
import {findByTestId, setup} from './test/utils';
import {ReactWrapper} from 'enzyme';

describe('<App />', () => {
  let wrapper: ReactWrapper;
  let appComponent: ReactWrapper;

  beforeEach(() => {
    wrapper = setup(App);
  });

  it('renders without error', () => {
    appComponent = findByTestId(wrapper, 'component-app');
    expect(appComponent.exists()).toBe(true);
  });
});
