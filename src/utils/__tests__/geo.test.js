/* eslint-disable no-undef */
import { getDistance, findClosestPoint } from '../geo.utils';


describe('getDistance', () => {
  it('calculates the distance between two points', () => {
    const p1 = [0, 0];
    const p2 = [4, 3];

    const actualOutput = getDistance(p1, p2);
    const expectedOutput = 5;

    expect(actualOutput).toEqual(expectedOutput);
  });
});

describe('findClosestPoint', () => {
  it('finds the single closest match', () => {
    const sourcePoint = [50, 50];
    const pointsById = {
      a: [0, 0],
      b: [45, 45],
      c: [51, 51], // This is the closest!
      d: [60, 60],
      e: [50, 70],
      f: [50, -50],
    };

    const actualOutput = findClosestPoint({ sourcePoint, pointsById });
    const expectedOutput = 'c';

    expect(actualOutput).toEqual(expectedOutput);
  });

  it('returns the first ID when multiple matches are found', () => {
    const sourcePoint = [50, 50];
    const pointsById = {
      a: [0, 0],
      b: [45, 45],
      c: [51, 51],
      d: [51, 51],
      e: [45, 45],
    };

    const actualOutput = findClosestPoint({ sourcePoint, pointsById });
    const expectedOutput = 'c';

    expect(actualOutput).toEqual(expectedOutput);
  });
});
