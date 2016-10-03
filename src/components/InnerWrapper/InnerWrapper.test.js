/* eslint-disable no-undef */
import React from 'react';
import renderer from 'react-test-renderer';
import InnerWrapper from './index';

describe('InnerWrapper', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<InnerWrapper />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
