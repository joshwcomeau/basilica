/* eslint-disable no-undef */
jest.mock('react-dom');

// NOTE: The MapBox integration I'm using uses refs, and React's test
// renderer does not yet handle refs.
//
// This will be fixed soon (https://github.com/facebook/react/issues/7740)
// Until then, I need to mock out the MapBox component
jest.mock('react-mapbox-gl');
