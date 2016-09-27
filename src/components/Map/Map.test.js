/* eslint-disable no-undef */
import React from 'react';
import renderer from 'react-test-renderer';
import Map from './index';

describe('Map', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<Map />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
