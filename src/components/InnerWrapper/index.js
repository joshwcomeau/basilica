// eslint-disable-next-line no-unused-vars
import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';

import './index.scss';


const InnerWrapper = ({ children, ...delegated }) => {
  const classes = classNames(['inner-wrapper', delegated.className]);

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
};

InnerWrapper.defaultProps = {
};

export default InnerWrapper;
