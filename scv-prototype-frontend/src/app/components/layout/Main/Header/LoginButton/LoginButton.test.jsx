import React from 'react';
import { shallow } from 'enzyme';
import LoginButton from './LoginButton';

describe('<LoginButton />', () => {
  test('renders', () => {
    const wrapper = shallow(<LoginButton />);
    expect(wrapper).toMatchSnapshot();
  });
});
