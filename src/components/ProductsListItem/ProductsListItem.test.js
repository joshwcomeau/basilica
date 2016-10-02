/* eslint-disable no-undef */
import React from 'react';
import renderer from 'react-test-renderer';
import ProductsListItem from './index';

describe('ProductsListItem', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<ProductsListItem />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
