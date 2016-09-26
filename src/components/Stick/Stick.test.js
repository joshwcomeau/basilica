/* eslint-disable no-undef */
import React from 'react';
import renderer from 'react-test-renderer';
import Stick from './index';

describe('Stick', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<Stick />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
