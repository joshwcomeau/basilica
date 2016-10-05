/* eslint-disable no-undef */
import React from 'react';
import renderer from 'react-test-renderer';
import CartItem from './index';

describe('CartItem', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<CartItem />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
