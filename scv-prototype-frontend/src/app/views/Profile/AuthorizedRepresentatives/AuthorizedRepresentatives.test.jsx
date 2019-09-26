import React from 'react';
import { shallow } from 'enzyme';
import AuthorizedRepresentatives from './AuthorizedRepresentatives';

describe('<AuthorizedRepresentatives />', () => {
  test('renders', () => {
    const wrapper = shallow(<AuthorizedRepresentatives />);
    expect(wrapper).toMatchSnapshot();
  });
});
