// eslint-disable-next-line no-unused-vars
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';

import {} from '../../actions';
import { productListSelector } from '../../reducers/products.reducer';

import ProductsListFilter from '../ProductsListFilter';
import ProductsListItem from '../ProductsListItem';
import './index.scss';


const ProductsList = ({ products, productFilter }) => {
  const classes = classNames(['products-list']);

  return (
    <div className={classes}>
      <div className="products-list-card">
        <ProductsListFilter filter={productFilter} />
        {products.map(product => (
          <ProductsListItem
            key={product.product_id}
            product={product}
          />
        ))}
      </div>
    </div>
  );
};

ProductsList.propTypes = {
  products: PropTypes.arrayOf(PropTypes.object),
  productFilter: PropTypes.oneOf(['reprint', 'original', 'all']),
};

ProductsList.defaultProps = {

};

const mapStateToProps = state => ({
  products: productListSelector(state),
});

export { ProductsList as ProductsListUnconnected };
export default connect(mapStateToProps)(ProductsList);
