// eslint-disable-next-line no-unused-vars
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';

import { changeProductFilter } from '../../actions';
import { productListSelector } from '../../reducers/products.reducer';
import productFilters from '../../data/product-filters';

import ProductsListFilter from '../ProductsListFilter';
import ProductsListItem from '../ProductsListItem';
import InnerWrapper from '../InnerWrapper';
import './index.scss';


const ProductsList = ({ products, activeFilter, changeProductFilter }) => {
  const classes = classNames(['products-list']);

  console.log('PRODUCTS', products);

  return (
    <div className={classes}>
      <InnerWrapper>
        <div className="products-list-card">
          <ProductsListFilter
            filters={productFilters}
            activeFilter={activeFilter}
            onClickFilter={changeProductFilter}
          />
          <div className="products-list-card-contents">
            {products.map(product => (
              <ProductsListItem
                key={product.product_id}
                product={product}
              />
            ))}
          </div>
        </div>
      </InnerWrapper>
    </div>
  );
};

ProductsList.propTypes = {
  products: PropTypes.arrayOf(PropTypes.object),
  activeFilter: PropTypes.oneOf(productFilters),
  changeProductFilter: PropTypes.func,
};

ProductsList.defaultProps = {

};

const mapStateToProps = state => ({
  products: productListSelector(state),
  activeFilter: state.products.filter,
});

export { ProductsList as ProductsListUnconnected };
export default connect(mapStateToProps, { changeProductFilter })(ProductsList);
