/* eslint-disable no-undef */
import {
  getDistance,
  findPointsWithinMap,
  findClosestPoint,
} from '../geo.utils';


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

describe('findPointsWithinMap', () => {
  it('returns only the points within the box', () => {
    const neBound = { lat: 40, lng: 50 };
    const swBound = { lat: 10, lng: 20 };

    const pointsById = {
      // These points are within the bounds:
      a: [15, 25],
      b: [39.99, 49.99],
      c: [35, 22],
      d: [10.01, 20.01],
      // These points are not:
      e: [9.99, 30],
      f: [41, 41],
      g: [25, 15],
      h: [35, 75],
      i: [-25, 30],
      j: [25, -30],
    };

    const actualOutput = findPointsWithinMap({
      neBound,
      swBound,
      pointsById,
    });
    const expectedOutput = ['a', 'b', 'c', 'd'];

    expect(actualOutput).toEqual(expectedOutput);
  });
});
