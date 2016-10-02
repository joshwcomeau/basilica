/* eslint-disable no-undef */
import React from 'react';
import renderer from 'react-test-renderer';
import ProductsListFilter from './index';

describe('ProductsListFilter', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<ProductsListFilter />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
