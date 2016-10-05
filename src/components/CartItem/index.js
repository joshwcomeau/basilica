/* eslint-disable camelcase */
// eslint-disable-next-line no-unused-vars
import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';

import Input from '../Input';
import Icon from '../Icon';
import shopifyProductPropTypes from '../../prop-types/shopify-product';
import './index.scss';


const CartItem = ({ item, updateQuantity }) => {
  const classes = classNames(['cart-item']);
  const {
    image,
    variant,
    quantity,
    title,
    summary,
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
        <h6>{variant.title}</h6>
        <p>{summary}</p>

        <Input
          className="quantity-input"
          label="Quantity"
          type="number"
          name={`quantity-${variant.id}`}
          value={quantity}
          onChange={updateQuantity}
        />

        <span className="cart-item-action-row">
          <span className="cart-item-price">{variant.formatted_price}</span>
          <button className="cart-item-remove">
            Remove Item
            <Icon value="remove_shopping" size={16} />
          </button>
        </span>
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
