// eslint-disable-next-line no-unused-vars
import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';

import Input from '../Input';
import shopifyProductPropTypes from '../../prop-types/shopify-product';
import './index.scss';


const CartItem = ({ item, updateQuantity }) => {
  const classes = classNames(['cart-item']);
  const {
    image,
    variant,
    quantity,
    title,
    variant_title,
    summary,
    formatted_price,
  } = item;

  return (
    <div className={classes}>
      <div className="cart-item-photo-container">
        <div
          className="cart-item-photo"
          style={{ backgroundImage: `url(${image.src})` }}
        />
      </div>
      <div className="cart-item-contents">
        <h4>{title}</h4>
        <p>{summary}</p>

        <Input
          label="Quantity"
          type="number"
          name={`quantity-${variant.id}`}
          value={1}
          onChange={updateQuantity}
        />

        <span className="cart-item-action-row" />
      </div>
    </div>
  );
};

CartItem.propTypes = {
  item: shopifyProductPropTypes,
  updateQuantity: PropTypes.func,
};

CartItem.defaultProps = {

};

export default CartItem;
