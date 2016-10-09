// eslint-disable-next-line no-unused-vars
import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';

import './index.scss';


const EditorialPhoto = ({
  src,
  width,
  height,
  float,
  caption,
  withShadow,
  onClick,
}) => {
  const classes = classNames([
    'editorial-photo',
    float,
    { 'with-shadow': withShadow },
  ]);

  const containerStyles = {};
  if (width) {
    containerStyles.width = `${width}px`;
  }
  if (height) {
    containerStyles.height = `${height}px`;
  }
  if (onClick) {
    containerStyles.cursor = 'pointer';
  }

  let shadow;
  if (withShadow) {
    shadow = (
      <svg
        className="editorial-photo-shadow"
        width="100%"
        height="25%"
      >
        <defs>
          <filter
            id="blur-12px"
            x="-75%"
            y="-75%"
            width="300%"
            height="300%"
          >
            <feGaussianBlur
              in="SourceGraphic"
              stdDeviation="12"
            />
          </filter>
        </defs>
        <ellipse
          filter="url(#blur-12px)"
          stroke="none"
          fill="#000000"
          cx="50%"
          cy="50%"
          rx="46%"
          ry="20%"
        />
      </svg>
    );
  }

  return (
    <div className={classes} style={containerStyles}>
      <a
        href={src}
        target="_blank"
        rel="noopener noreferrer"
        className="image-and-shadow"
        onClick={ev => {
          ev.preventDefault();
          onClick({ urls: [src] });
        }}
      >
        <img src={src} role="presentation" />
        {shadow}
      </a>
      <div className="caption">{caption}</div>
    </div>
  );
};

EditorialPhoto.propTypes = {
  src: PropTypes.string,
  width: PropTypes.number,
  height: PropTypes.number,
  float: PropTypes.oneOf(['left', 'right']),
  caption: PropTypes.string,
  withShadow: PropTypes.bool,
  onClick: PropTypes.func,
};


export default EditorialPhoto;
