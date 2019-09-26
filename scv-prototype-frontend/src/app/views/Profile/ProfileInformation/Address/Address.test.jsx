import React from 'react';
import { shallow } from 'enzyme';
import Address from './Address';

describe('<Address />', () => {
  test('renders', () => {
    const wrapper = shallow(<Address />);
    expect(wrapper).toMatchSnapshot();
  });
});
