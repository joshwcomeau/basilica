/* eslint-disable no-undef */
import React from 'react';
import renderer from 'react-test-renderer';
import ProductListItemPhoto from './index';

describe('ProductListItemPhoto', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<ProductListItemPhoto />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
