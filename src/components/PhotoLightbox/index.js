// eslint-disable-next-line no-unused-vars
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Lightbox from 'react-image-lightbox';

import {
  lightboxClose,
  lightboxMoveNext,
  lightboxMovePrevious,
} from '../../actions';
import {
  currentImageSelector,
  nextImageSelector,
  previousImageSelector,
} from '../../reducers/lightbox.reducer';
import './index.scss';


const PhotoLightbox = ({
  isOpen,
  currentImage,
  nextImage,
  previousImage,
  lightboxClose,
  lightboxMoveNext,
  lightboxMovePrevious,
}) => {
  const lightbox = isOpen && (
    <Lightbox
      mainSrc={currentImage}
      nextSrc={nextImage}
      prevSrc={previousImage}
      onCloseRequest={lightboxClose}
      onMoveNextRequest={lightboxMoveNext}
      onMovePrevRequest={lightboxMovePrevious}
    />
  );

  return (
    <div>
      {lightbox}
    </div>
  );
};

PhotoLightbox.propTypes = {
  isOpen: PropTypes.bool,
  currentImage: PropTypes.string,
  nextImage: PropTypes.string,
  previousImage: PropTypes.string,
  lightboxClose: PropTypes.func.isRequired,
  lightboxMoveNext: PropTypes.func.isRequired,
  lightboxMovePrevious: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  isOpen: state.lightbox.isOpen,
  currentImage: currentImageSelector(state),
  nextImage: nextImageSelector(state),
  previousImage: previousImageSelector(state),
});

export { PhotoLightbox as PhotoLightboxUnconnected };
export default connect(mapStateToProps, {
  lightboxClose,
  lightboxMoveNext,
  lightboxMovePrevious,
})(PhotoLightbox);
