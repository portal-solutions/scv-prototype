import React from 'react';
import { shallow } from 'enzyme';
import NavBarItem from './NavBarItem';

describe('<NavBarItem />', () => {
  test('renders', () => {
    const wrapper = shallow(<NavBarItem />);
    expect(wrapper).toMatchSnapshot();
  });
});
