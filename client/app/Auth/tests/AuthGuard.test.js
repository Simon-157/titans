import React from 'react';
import { shallow } from 'enzyme';
import { Provider } from 'react-redux';
import AuthGuard from '../AuthGuard';

describe('AuthGuard component', () => {
  it('Should render AuthGuard component without errors', () => {
    const component = shallow(
      <Provider store={global.mockStore()}>
        <AuthGuard />
      </Provider>,
    );

    expect(component.html()).not.toBe(null);
  });
});
