/* eslint-disable no-undef */
import React from 'react';
import renderer from 'react-test-renderer';
import AddToCartButton from './index';

describe('AddToCartButton', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<AddToCartButton />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
