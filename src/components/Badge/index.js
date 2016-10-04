// eslint-disable-next-line no-unused-vars
import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';

import './index.scss';


const Badge = ({ children, className }) => {
  const classes = classNames(['badge', className]);

  return (
    <div className={classes}>
      {children}
    </div>
  );
};

Badge.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};


export default Badge;
