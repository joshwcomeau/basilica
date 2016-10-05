import { createSelector } from 'reselect';

import {
  LIGHTBOX_OPEN,
  LIGHTBOX_CLOSE,
  LIGHTBOX_MOVE_NEXT,
  LIGHTBOX_MOVE_PREVIOUS,
} from '../actions';


const initialState = {
  isOpen: false,
  imageUrls: [],
  currentIndex: null,
};

export default function reducer(state = initialState, action) {
  const { type, urls } = action;

  switch (type) {
    case LIGHTBOX_OPEN: {
      return {
        isOpen: true,
        imageUrls: urls,
        currentIndex: 0,
      };
    }

    case LIGHTBOX_CLOSE: {
      return { ...initialState };
    }

    case LIGHTBOX_MOVE_NEXT: {
      const newIndex = (state.currentIndex + 1) % state.imageUrls.length;

      return {
        ...state,
        currentIndex: newIndex,
      };
    }

    case LIGHTBOX_MOVE_PREVIOUS: {
      const newIndex = (state.currentIndex - 1) % state.imageUrls.length;

      return {
        ...state,
        currentIndex: newIndex,
      };
    }

    default: return state;
  }
}


// ////////////////////
// Selectors /////////
// //////////////////
const imageUrls = state => state.lightbox.imageUrls;
const currentIndex = state => state.lightbox.currentIndex;

export const currentImageSelector = createSelector(
  [imageUrls, currentIndex],
  (imageUrls, currentIndex) => (
    imageUrls[currentIndex]
  )
);

export const nextImageSelector = createSelector(
  [imageUrls, currentIndex],
  (imageUrls, currentIndex) => {
    if (imageUrls.length < 2) {
      return null;
    }

    return imageUrls[(currentIndex + 1)];
  }
);

export const previousImageSelector = createSelector(
  [imageUrls, currentIndex],
  (imageUrls, currentIndex) => {
    if (imageUrls.length < 2) {
      return null;
    }

    return imageUrls[(currentIndex - 1)];
  }
);
