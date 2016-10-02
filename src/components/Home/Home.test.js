/* eslint-disable no-undef */
import React from 'react';
import renderer from 'react-test-renderer';
import { Home } from './index';

describe('Home', () => {
  // TODO: wrap in <provider> with a test store
  xit('renders correctly', () => {
    const tree = renderer.create(
      <Home
        city="montreal"
        initializeShopify={() => {}}
      />
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
