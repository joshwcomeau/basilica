/* eslint-disable no-undef */
import React from 'react';
import renderer from 'react-test-renderer';
import ToggleRow from './index';

describe('ToggleRow', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<ToggleRow />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
