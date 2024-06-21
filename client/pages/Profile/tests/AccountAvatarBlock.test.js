import React from 'react';
import { shallow } from 'enzyme';
import { Provider } from 'react-redux';
import AccountAvatarBlock from '../AccountAvatarBlock';

describe('AccountAvatarBlock component', () => {
  it('Should render AccountAvatarBlock component without errors', () => {
    const component = shallow(
      <Provider store={global.mockStore()}>
        <AccountAvatarBlock />
      </Provider>,
    );

    expect(component.html()).not.toBe(null);
  });
});
