// eslint-disable-next-line no-unused-vars
import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';

import './index.scss';


const InnerWrapper = ({ children, size, ...delegated }) => {
  const classes = classNames(['inner-wrapper', size, delegated.className]);

  return (
    <div {...delegated} className={classes}>
      <div className="inner-wrapper-contents">
        {children}
      </div>
    </div>
  );
};

InnerWrapper.propTypes = {
  children: PropTypes.node,
  size: PropTypes.oneOf(['regular', 'narrow']),
};

InnerWrapper.defaultProps = {
  size: 'regular',
};

export default InnerWrapper;
