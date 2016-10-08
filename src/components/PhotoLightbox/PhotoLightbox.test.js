/* eslint-disable no-undef */
import React from 'react';
import renderer from 'react-test-renderer';
import PhotoLightbox from './index';

describe('PhotoLightbox', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<PhotoLightbox />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
