// eslint-disable-next-line no-unused-vars
import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';

import './index.scss';


const Logo = () => {
  const classes = classNames(['logo']);

  return (
    <h2 className={classes}>
      Basilica
    </h2>
  );
};

Logo.propTypes = {

};

Logo.defaultProps = {

};

export default Logo;
