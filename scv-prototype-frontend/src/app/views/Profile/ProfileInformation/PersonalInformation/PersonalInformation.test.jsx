import React from 'react';
import { shallow } from 'enzyme';
import PersonalInformation from './PersonalInformation';

describe('<PersonalInformation />', () => {
  test('renders', () => {
    const wrapper = shallow(<PersonalInformation />);
    expect(wrapper).toMatchSnapshot();
  });
});
