import React from 'react';
import { shallow } from 'enzyme';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import FAQ from '../index';

describe('FAQ component', () => {
  it('Should render FAQ component without errors', () => {
    const component = shallow(
      <Provider store={global.mockStore()}>
        <BrowserRouter>
          <FAQ />
        </BrowserRouter>
      </Provider>,
    );

    expect(component.html()).not.toBe(null);
  });
});
