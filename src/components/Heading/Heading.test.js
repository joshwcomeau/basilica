/* eslint-disable no-undef */
import React from 'react';
import renderer from 'react-test-renderer';
import Heading from './index';

describe('Heading', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<Heading />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
