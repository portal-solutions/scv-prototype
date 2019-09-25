import React from 'react';
import { shallow } from 'enzyme';
import ProfileInformation from './ProfileInformation';

describe('<ProfileInformation />', () => {
  test('renders', () => {
    const wrapper = shallow(<ProfileInformation />);
    expect(wrapper).toMatchSnapshot();
  });
});
