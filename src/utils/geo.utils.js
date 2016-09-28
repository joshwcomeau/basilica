import { getQueryParams } from './misc.utils';

// eslint-disable-next-line import/prefer-default-export
export const getDefaultCity = () => {
  // The default city can be set in 1 of 2 ways:
  //   - The URL can be set with a query param
  //   - The 'remembered' city can be read from localStorage.
  // If neither of these two methods is present, we default to Montreal.
  const { city } = getQueryParams();
  if (city) { return city; }

  const rememberedCity = localStorage.getItem('basilica-city');
  if (rememberedCity) { return rememberedCity; }

  return 'montreal';
};

export const getDistance = ([lat1, lng1], [lat2, lng2]) => {
  const distanceLat = Math.abs(lat1 - lat2);
  const distanceLng = Math.abs(lng1 - lng2);

  // Pythagorean theorem!
  return Math.sqrt(
    distanceLat ** 2 + distanceLng ** 2
  );
};

/** findClosestPoint
  Finds the closest geometric point to a specified coordinate.

  @param {lat} number
  @param {lng} number
  @param {points} object -  the key is a unique identifier, while the value
                            is an array of [lat, lng].

  @returns string - the ID of the matched point.
*/
export const findClosestPoints = ({ sourcePoint, pointsById }) => {
  let matches = [];
  let closestDistance = Infinity;

  Object.keys(pointsById).forEach((pointId) => {
    const point = pointsById[pointId];
    const distance = getDistance(sourcePoint, point);

    if (distance < closestDistance) {
      closestDistance = distance;
      matches = [pointId];
    } else if (distance === closestDistance) {
      matches.push(pointId);
    }
  });

  return matches;
};
