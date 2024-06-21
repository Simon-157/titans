import React from 'react';
import { shallow } from 'enzyme';
import { Provider } from 'react-redux';
import CharacterScrolls from '../index';

describe('CharacterScrolls component', () => {
  it('Should render CharacterScrolls component without errors', () => {
    const component = shallow(
      <Provider store={global.mockStore()}>
        <CharacterScrolls />
      </Provider>,
    );

    expect(component.html()).not.toBe(null);
  });
});
