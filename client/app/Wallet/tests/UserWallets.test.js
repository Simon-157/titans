import React from 'react';
import { shallow } from 'enzyme';
import { Provider } from 'react-redux';
import UserWallets from '../UserWallets';

describe('UserWallets component', () => {
  it('Should render UserWallets component without errors', () => {
    const component = shallow(
      <Provider store={global.mockStore()}>
        <UserWallets />
      </Provider>,
    );

    expect(component.html()).not.toBe(null);
  });
});
