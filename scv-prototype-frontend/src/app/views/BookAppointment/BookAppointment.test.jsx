import React from 'react';
import { shallow } from 'enzyme';
import BookAppointment from './BookAppointment';

describe('<BookAppointment />', () => {
  test('renders', () => {
    const wrapper = shallow(<BookAppointment />);
    expect(wrapper).toMatchSnapshot();
  });
});
