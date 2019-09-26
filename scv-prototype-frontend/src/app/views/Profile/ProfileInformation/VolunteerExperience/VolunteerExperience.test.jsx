import React from 'react';
import { shallow } from 'enzyme';
import VolunteerExperience from './VolunteerExperience';

describe('<VolunteerExperience />', () => {
  test('renders', () => {
    const wrapper = shallow(<VolunteerExperience />);
    expect(wrapper).toMatchSnapshot();
  });
});
