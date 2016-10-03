// eslint-disable-next-line no-unused-vars
import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';

import './index.scss';


const ProductsListFilter = () => {
  const classes = classNames(['products-list-filter']);

  return (
    <div className={classes}>
      <ul>
        <li className="is-active">Print</li>
        <li>Original</li>
        <li>All</li>
      </ul>
    </div>
  );
};

ProductsListFilter.propTypes = {

};

ProductsListFilter.defaultProps = {

};

export default ProductsListFilter;
