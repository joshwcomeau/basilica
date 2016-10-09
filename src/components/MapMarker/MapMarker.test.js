/* eslint-disable no-undef */
import React from 'react';
import renderer from 'react-test-renderer';
import MapMarker from './index';

describe('MapMarker', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<MapMarker />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
