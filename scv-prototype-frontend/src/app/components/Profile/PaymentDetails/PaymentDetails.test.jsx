import React from 'react';
import { shallow } from 'enzyme';
import PaymentDetails from './PaymentDetails';

describe('<PaymentDetails />', () => {
  test('renders', () => {
    const wrapper = shallow(<PaymentDetails />);
    expect(wrapper).toMatchSnapshot();
  });
});
