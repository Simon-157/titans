import React from 'react';
import { shallow } from 'enzyme';
import { Provider } from 'react-redux';
import CharacterOwner from '../CharacterOwner';

describe('CharacterOwner component', () => {
  it('Should render CharacterOwner component without errors', () => {
    const component = shallow(
      <Provider store={global.mockStore()}>
        <CharacterOwner />
      </Provider>,
    );

    expect(component.html()).not.toBe(null);
  });
});
