/* eslint-disable no-undef */
import React from 'react';
import renderer from 'react-test-renderer';
import StickyLogo from './index';

it('renders correctly', () => {
  const tree = renderer.create(<StickyLogo />).toJSON();
  expect(tree).toMatchSnapshot();
});
