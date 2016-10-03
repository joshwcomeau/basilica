// eslint-disable-next-line no-unused-vars
import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';

import { capitalize } from '../../utils/misc.utils';
import './index.scss';


const ProductsListFilter = ({ filters, activeFilter, onClickFilter }) => {
  const classes = classNames(['products-list-filter']);

  const filterElements = filters.map((filter) => {
    const filterClasses = classNames({
      'is-active': filter === activeFilter,
    });

    return (
      <li className={filterClasses} key={filter}>
        {/* Adding a <button> to be a11y-compliant */}
        <button onClick={() => onClickFilter({ filter })}>
          {capitalize(filter)}
        </button>
      </li>
    );
  });

  return (
    <div className={classes}>
      <ul>
        {filterElements}
      </ul>
    </div>
  );
};

ProductsListFilter.propTypes = {
  filters: PropTypes.arrayOf(PropTypes.string),
  activeFilter: PropTypes.string,
  onClickFilter: PropTypes.func,
};

ProductsListFilter.defaultProps = {

};

export default ProductsListFilter;
