/* eslint-disable react/no-danger */
// eslint-disable-next-line no-unused-vars
import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';

import logo from '../../images/logo.svg';
import './index.scss';


const Logo = () => {
  const classes = classNames(['logo']);

  return (
    <div className={classes} dangerouslySetInnerHTML={{ __html: logo }} />
  );
};

Logo.propTypes = {

};

Logo.defaultProps = {

};

export default Logo;
