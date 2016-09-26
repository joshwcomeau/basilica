/* eslint-disable no-undef */
import { getDistance } from '../geo.utils';

describe('getDistance', () => {
  it('calculates the distance between two points', () => {
    const p1 = [0, 0];
    const p2 = [4, 3];

    const actualOutput = getDistance(p1, p2);
    const expectedOutput = 5;

    expect(actualOutput).toEqual(expectedOutput);
  });
});
