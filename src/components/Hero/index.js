// eslint-disable-next-line no-unused-vars
import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';

import './index.scss';
import backgroundImage from '../../images/placeholder-home-hero.jpeg';


const Hero = () => {
  const classes = classNames(['hero']);

  return (
    <div
      className={classes}
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      Your Component Here :)
    </div>
  );
};

Hero.propTypes = {

};

Hero.defaultProps = {

};

export default Hero;
