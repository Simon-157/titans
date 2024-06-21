import React from 'react';
import { shallow } from 'enzyme';
import { Provider } from 'react-redux';
import RentalSettings from '../RentalSettings';

describe('RentalSettings component', () => {
  it('Should render RentalSettings component without errors', () => {
    const component = shallow(
      <Provider store={global.mockStore()}>
        <RentalSettings />
      </Provider>,
    );

    expect(component.html()).not.toBe(null);
  });
});
