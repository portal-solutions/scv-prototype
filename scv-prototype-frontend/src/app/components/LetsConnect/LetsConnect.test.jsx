import React from 'react';
import { shallow } from 'enzyme';
import LetsConnect from './LetsConnect';

describe('<LetsConnect />', () => {
  test('renders', () => {
    const wrapper = shallow(<LetsConnect />);
    expect(wrapper).toMatchSnapshot();
  });
});
