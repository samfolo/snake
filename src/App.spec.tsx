import {ReactWrapper, mount} from 'enzyme';
import React from 'react';
import {MemoryRouter} from 'react-router';

import {App} from './App';
import {findByTestId} from './test/utils';

describe('<App />', () => {
  let wrapper: ReactWrapper;
  let appComponent: ReactWrapper;

  beforeEach(() => {
    wrapper = mount(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );
  });

  it('renders without error', () => {
    appComponent = findByTestId(wrapper, 'component-app');
    expect(appComponent.exists()).toBe(true);
  });
});
