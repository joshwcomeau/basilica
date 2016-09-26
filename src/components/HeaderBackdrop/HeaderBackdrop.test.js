/* eslint-disable no-undef */
import React from 'react';
import renderer from 'react-test-renderer';
import HeaderBackdrop from './index';

describe('HeaderBackdrop', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<HeaderBackdrop />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
