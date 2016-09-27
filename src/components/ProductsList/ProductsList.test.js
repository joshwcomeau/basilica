/* eslint-disable no-undef */
import React from 'react';
import renderer from 'react-test-renderer';
import ProductsList from './index';

describe('ProductsList', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<ProductsList />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
