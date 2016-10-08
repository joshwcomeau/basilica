/* eslint-disable no-undef */
import React from 'react';
import renderer from 'react-test-renderer';
import EditorialPhoto from './index';

describe('EditorialPhoto', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<EditorialPhoto />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
