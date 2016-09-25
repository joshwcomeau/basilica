// eslint-disable-next-line no-unused-vars
import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';

import './index.scss';


const HeaderContents = () => {
  const classes = classNames(['header-contents']);

  return (
    <div className={classes}>
      City: Montreal
    </div>
  );
};

HeaderContents.propTypes = {

};

HeaderContents.defaultProps = {

};

export default HeaderContents;
