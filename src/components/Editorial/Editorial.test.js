/* eslint-disable no-undef */
import React from 'react';
import renderer from 'react-test-renderer';
import Editorial from './index';

describe('Editorial', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<Editorial />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
