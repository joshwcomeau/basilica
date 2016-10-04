/* eslint-disable no-undef */
import React from 'react';
import renderer from 'react-test-renderer';
import ProductLightbox from './index';

describe('ProductLightbox', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<ProductLightbox />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
