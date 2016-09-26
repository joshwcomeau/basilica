/* eslint-disable no-undef */
import React from 'react';
import renderer from 'react-test-renderer';
import Hero from './index';

describe('Hero', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<Hero />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
