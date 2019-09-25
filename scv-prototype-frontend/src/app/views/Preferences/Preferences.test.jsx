import React from 'react';
import { shallow } from 'enzyme';
import Preferences from './Preferences';

describe('<Preferences />', () => {
  test('renders', () => {
    const wrapper = shallow(<Preferences />);
    expect(wrapper).toMatchSnapshot();
  });
});
