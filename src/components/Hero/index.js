// eslint-disable-next-line no-unused-vars
import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';

import Stick from '../Stick';
import Logo from '../Logo';
import InnerWrapper from '../InnerWrapper';
import './index.scss';
import defaultBackgroundImage from '../../images/placeholder-home-hero.jpeg';


const Hero = ({ children, backgroundImage }) => {
  const classes = classNames(['hero']);

  return (
    <div
      className={classes}
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <Stick className="sticky-logo">
        <InnerWrapper>
          <Logo />
        </InnerWrapper>
      </Stick>

      {children}
    </div>
  );
};

Hero.propTypes = {
  children: PropTypes.node,
  backgroundImage: PropTypes.string.isRequired,
};

Hero.defaultProps = {
  backgroundImage: defaultBackgroundImage,
};

export default Hero;
