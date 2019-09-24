import React from 'react';
import { shallow } from 'enzyme';
import JobsSkills from './JobsSkills';

describe('<JobsSkills />', () => {
  test('renders', () => {
    const wrapper = shallow(<JobsSkills />);
    expect(wrapper).toMatchSnapshot();
  });
});
