/* eslint-disable no-undef */
import React from 'react';
import renderer from 'react-test-renderer';
import Cart from './index';

describe('Cart', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<Cart />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
