import React from 'react';
import { shallow } from 'enzyme';
import BreadcrumbItem from './BreadcrumbItem';

describe('<BreadcrumbItem />', () => {
  test('renders', () => {
    const wrapper = shallow(<BreadcrumbItem href="http://www.canada.ca/" text="Home" />);
    expect(wrapper).toMatchSnapshot();
  });
});
