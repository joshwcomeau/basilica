/* eslint-disable no-undef */
import React from 'react';
import renderer from 'react-test-renderer';
import HeaderContents from './index';

describe('HeaderContents', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<HeaderContents />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
