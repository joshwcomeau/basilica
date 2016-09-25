// eslint-disable-next-line no-unused-vars
import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import { Sticky } from 'react-sticky';

import Logo from '../Logo';

import './index.scss';


const StickyLogo = () => {
  const classes = classNames(['sticky-logo']);

  return (
    <Sticky
      className={classes}
      style={{
        position: 'absolute',
        height: '50px',
        lineHeight: '50px',
        top: '-55px',
        left: '15px',
      }}
      stickyStyle={{
        width: 'auto',
        left: '25px',
      }}
      topOffset={-55}
    >
      <Logo />
    </Sticky>
  );
};

StickyLogo.propTypes = {

};

StickyLogo.defaultProps = {

};

export default StickyLogo;
