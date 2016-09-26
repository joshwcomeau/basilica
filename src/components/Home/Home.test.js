/* eslint-disable no-undef */
import React from 'react';
import renderer from 'react-test-renderer';
import { Home } from './index';

it('renders correctly', () => {
  const tree = renderer.create(
    <Home initializeShopify={() => {}} />
  ).toJSON();
  expect(tree).toMatchSnapshot();
});
