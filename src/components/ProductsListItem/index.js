// eslint-disable-next-line no-unused-vars
import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';

import './index.scss';


const ProductsListItem = () => {
  const classes = classNames(['products-list-item']);

  return (
    <div className={classes}>
      Your Component Here :)
    </div>
  );
};

ProductsListItem.propTypes = {

};

ProductsListItem.defaultProps = {

};

export default ProductsListItem;
