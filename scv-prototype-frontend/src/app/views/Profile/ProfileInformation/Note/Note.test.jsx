import React from 'react';
import { shallow } from 'enzyme';
import Note from './Note';

describe('<Note />', () => {
  test('renders', () => {
    const wrapper = shallow(<Note />);
    expect(wrapper).toMatchSnapshot();
  });
});
