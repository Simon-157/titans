import React from 'react';
import { shallow } from 'enzyme';
import { Provider } from 'react-redux';
import CharacterTaker from '../CharacterTaker';

describe('CharacterTaker component', () => {
  it('Should render CharacterTaker component without errors', () => {
    const component = shallow(
      <Provider store={global.mockStore()}>
        <CharacterTaker />
      </Provider>,
    );

    expect(component.html()).not.toBe(null);
  });
});
