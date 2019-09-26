import React from 'react';
import { shallow } from 'enzyme';
import InclusiveAccessibleServiceOptions from './InclusiveAccessibleServiceOptions';

describe('<InclusiveAccessibleServiceOptions />', () => {
  test('renders', () => {
    const wrapper = shallow(<InclusiveAccessibleServiceOptions />);
    expect(wrapper).toMatchSnapshot();
  });
});
