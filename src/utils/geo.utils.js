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
