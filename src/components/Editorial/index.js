// eslint-disable-next-line no-unused-vars
import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';

import './index.scss';


const Editorial = () => {
  const classes = classNames(['editorial']);

  return (
    <div className={classes}>
      Words and Stuff
    </div>
  );
};

Editorial.propTypes = {

};

Editorial.defaultProps = {

};

export default Editorial;
