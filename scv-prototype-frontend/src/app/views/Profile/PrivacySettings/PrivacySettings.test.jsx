import React from 'react';
import { shallow } from 'enzyme';
import PrivacySettings from './PrivacySettings';

describe('<PrivacySettings />', () => {
  test('renders', () => {
    const wrapper = shallow(<PrivacySettings />);
    expect(wrapper).toMatchSnapshot();
  });
});
