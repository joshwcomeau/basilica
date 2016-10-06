/* eslint-disable camelcase */
// eslint-disable-next-line no-unused-vars
import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';

import Input from '../Input';
import Icon from '../Icon';
import shopifyProductPropTypes from '../../prop-types/shopify-product';
import './index.scss';


class CartItem extends Component {
  constructor(props) {
    super(props);

    this.updateQuantity = this.updateQuantity.bind(this);
    this.removeItem = this.removeItem.bind(this);
  }
  updateQuantity(ev) {
    const newQuantity = ev.target.value;

    this.props.updateCartQuantity({
      cartLineId: this.props.item.cartLineId,
      quantity: newQuantity,
    });
  }

  removeItem() {
    this.props.removeCartItem({
      cartLineId: this.props.item.cartLineId,
    });
  }

  render() {
    const { item } = this.props;
    const {
      image,
      variant,
      quantity,
      title,
      summary,
    } = item;
    const classes = classNames(['cart-item']);

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
            onChange={this.updateQuantity}
            min={1}
            max={100}
          />

          <span className="cart-item-action-row">
            <span className="cart-item-price">{variant.formatted_price}</span>
            <button className="cart-item-remove" onClick={this.removeItem}>
              Remove Item
              <Icon value="remove_shopping" size={16} />
            </button>
          </span>
        </div>
      </div>
    );
  }
}

CartItem.propTypes = {
  item: shopifyProductPropTypes,
  removeCartItem: PropTypes.func.isRequired,
  updateCartQuantity: PropTypes.func.isRequired,
};

CartItem.defaultProps = {

};

export default CartItem;
