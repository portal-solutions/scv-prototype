import React from 'react';
import { shallow } from 'enzyme';
import BenefitsServices from './BenefitsServices';

describe('<BenefitsServices />', () => {
  test('renders', () => {
    const wrapper = shallow(<BenefitsServices />);
    expect(wrapper).toMatchSnapshot();
  });
});
