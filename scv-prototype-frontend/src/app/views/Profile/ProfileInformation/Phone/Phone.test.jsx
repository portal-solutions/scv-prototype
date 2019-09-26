import React from 'react';
import { shallow } from 'enzyme';
import Phone from './Phone';

describe('<Phone />', () => {
  test('renders', () => {
    const wrapper = shallow(<Phone />);
    expect(wrapper).toMatchSnapshot();
  });
});
