import React from 'react';
import { shallow } from 'enzyme';
import { Provider } from 'react-redux';
import Discord from '../Discord';

describe('Discord component', () => {
  it('Should render Discord component without errors', () => {
    const component = shallow(
      <Provider store={global.mockStore()}>
        <Discord user={{ id: 123 }} />
      </Provider>,
    );

    expect(component.html()).not.toBe(null);
  });
});
