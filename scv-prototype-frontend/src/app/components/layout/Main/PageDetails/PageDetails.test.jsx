import React from 'react';
import { shallow } from 'enzyme';
import PageDetails from './PageDetails';

describe('<PageDetails />', () => {
  test('renders', () => {
    const wrapper = shallow(<PageDetails />);
    expect(wrapper).toMatchSnapshot();
  });
});
