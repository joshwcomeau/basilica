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


/** findPointsWithinMap
  Finds all point IDs that fall within the given map area.

  @param {neBound} object { lat, lng } - North-east coordinate
  @param {swBound} object { lat, lng } - South-west coordinate
  @param {pointsById} object -  the key is a unique identifier, while the value
                            is an array of [lat, lng].
*/
export const findPointsWithinMap = ({ neBound, swBound, pointsById }) => {
  return Object.keys(pointsById).filter((pointId) => {
    const [lat, lng] = pointsById[pointId];

    const isWithinNEBound = lat < neBound.lat && lng < neBound.lng;
    const isWithinSWBound = lat > swBound.lat && lng > swBound.lng;

    return isWithinNEBound && isWithinSWBound;
  });
};


/** findClosestPoint
  Finds the closest geometric point to a specified coordinate.
  NOTE: Currently unused, was part of a former strategy to only show 1 product
  at a time. May still come in handy though.

  @param {lat} number
  @param {lng} number
  @param {points} object -  the key is a unique identifier, while the value
                            is an array of [lat, lng].

  @returns string - the ID of the matched point.
*/
export const findClosestPoint = ({ sourcePoint, pointsById }) => {
  let closestId = null;
  let closestDistance = Infinity;

  Object.keys(pointsById).forEach((pointId) => {
    const point = pointsById[pointId];
    const distance = getDistance(sourcePoint, point);

    if (distance < closestDistance) {
      closestDistance = distance;
      closestId = pointId;
    }
  });

  return closestId;
};
