// eslint-disable-next-line no-unused-vars
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';

import { changeProductFilter } from '../../actions';
import { visibleProductIdsSelector } from '../../reducers/products.reducer';
import productFilters from '../../data/product-filters';

import ToggleRow from '../ToggleRow';
import ProductsListItem from '../ProductsListItem';
import InnerWrapper from '../InnerWrapper';
import './index.scss';


const ProductsList = ({
  productIds,
  activeFilter,
  changeProductFilter,
}) => {
  const classes = classNames(['products-list']);

  return (
    <div className={classes}>
      <InnerWrapper>
        <div className="products-list-card">
          <ToggleRow
            className="products-list-filter"
            items={productFilters}
            activeItem={activeFilter}
            onClickItem={changeProductFilter}
          />
          <div className="products-list-card-contents">
            {productIds.map(id => (
              <ProductsListItem
                key={id}
                id={id}
              />
            ))}
          </div>
        </div>
      </InnerWrapper>
    </div>
  );
};

ProductsList.propTypes = {
  productIds: PropTypes.arrayOf(PropTypes.string),
  activeFilter: PropTypes.oneOf(productFilters),
  changeProductFilter: PropTypes.func,
};

ProductsList.defaultProps = {

};

const mapStateToProps = state => ({
  productIds: visibleProductIdsSelector(state),
  activeFilter: state.products.filter,
});

export { ProductsList as ProductsListUnconnected };
export default connect(mapStateToProps, {
  changeProductFilter,
})(ProductsList);
