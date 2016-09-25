// eslint-disable-next-line no-unused-vars
import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';

import './index.scss';


const HeaderBackdrop = () => {
  const classes = classNames(['header-backdrop']);

  return (
    <div className={classes} />
  );
};

HeaderBackdrop.propTypes = {

};

HeaderBackdrop.defaultProps = {

};

export default HeaderBackdrop;
