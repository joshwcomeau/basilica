/* eslint-disable jsx-a11y/no-static-element-interactions */
// eslint-disable-next-line no-unused-vars
import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';

import overlay from '../../images/product-overlay.png';
import './index.scss';


const ProductListItemPhoto = ({ imageUrl, altText, onClick }) => {
  const classes = classNames(['product-list-item-photo']);

  return (
    <a className={classes} onClick={onClick}>
      <div className="photo-wrapper">
        <div
          className="overlay"
          style={{ backgroundImage: `url(${overlay})` }}
        />
        <img src={imageUrl} alt={altText} />
        <div className="fancy-shadow-center" />
        <div className="fancy-shadow-corner" />
      </div>
    </a>
  );
};

ProductListItemPhoto.propTypes = {
  imageUrl: PropTypes.string.isRequired,
  altText: PropTypes.string,
  onClick: PropTypes.func,
};

ProductListItemPhoto.defaultProps = {

};

export default ProductListItemPhoto;
