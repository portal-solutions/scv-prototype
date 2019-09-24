import React from 'react';
import { shallow } from 'enzyme';
import Inbox from './Inbox';

describe('<Inbox />', () => {
  test('renders', () => {
    const wrapper = shallow(<Inbox />);
    expect(wrapper).toMatchSnapshot();
  });
});
