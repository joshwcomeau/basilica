// eslint-disable-next-line no-unused-vars
import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';

import './index.scss';


const Clearfix = ({ children, className }) => {
  const classes = classNames(['clearfix', className]);

  return (
    <div className={classes}>
      {children}
    </div>
  );
};

Clearfix.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

Clearfix.defaultProps = {

};

export default Clearfix;
