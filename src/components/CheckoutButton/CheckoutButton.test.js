/* eslint-disable no-undef */
import React from 'react';
import renderer from 'react-test-renderer';
import CheckoutButton from './index';

describe('CheckoutButton', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<CheckoutButton />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
