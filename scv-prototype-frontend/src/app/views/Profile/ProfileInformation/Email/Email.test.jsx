import React from 'react';
import { shallow } from 'enzyme';
import Email from './Email';

describe('<Email />', () => {
  test('renders', () => {
    const wrapper = shallow(<Email />);
    expect(wrapper).toMatchSnapshot();
  });
});
