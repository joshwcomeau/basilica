// eslint-disable-next-line no-unused-vars
import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';

import './index.scss';


const ProductsList = () => {
  const classes = classNames(['products-list']);

  return (
    <div className={classes}>
      Your Component Here :)
    </div>
  );
};

ProductsList.propTypes = {

};

ProductsList.defaultProps = {

};

export default ProductsList;
