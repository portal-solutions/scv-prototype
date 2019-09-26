import React from 'react';
import { shallow } from 'enzyme';
import MyIdentifiers from './MyIdentifiers';

describe('<MyIdentifiers />', () => {
  test('renders', () => {
    const wrapper = shallow(<MyIdentifiers />);
    expect(wrapper).toMatchSnapshot();
  });
});
