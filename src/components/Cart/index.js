// eslint-disable-next-line no-unused-vars
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import pluralize from 'pluralize';

import { toggleCart } from '../../actions';
import cartItemsSelector from '../../selectors/cart-items.selector';
import cartPriceSelector from '../../selectors/cart-price.selector';
import shopifyProductPropTypes from '../../prop-types/shopify-product';

import Button from '../Button';
import CartItem from '../CartItem';
import Icon from '../Icon';
import './index.scss';


const Cart = ({ cartItems, cartPrice, isOpen, toggleCart }) => {
  const classes = classNames(['cart', { 'is-visible': isOpen }]);

  return (
    <div className={classes}>
      <button className="close-cart" onClick={toggleCart}>
        <Icon value="close" />
      </button>

      <h2 className="cart-title">
        Your Cart
        <span className="item-count">
          {pluralize('Item', cartItems.length, true)}
        </span>
      </h2>

      <div className="cart-contents">
        {cartItems.map(item =>
          <CartItem
            item={item}
            key={`${item.product_id}-${item.variant.id}`}
          />
        )}
      </div>

      <div className="cart-checkout">
        <span className="cart-price">
          <span className="cart-price-label">Total</span>
          {cartPrice}
        </span>
        <Button theme="dark">Proceed to Checkout</Button>
      </div>
    </div>
  );
};

Cart.propTypes = {
  cartItems: PropTypes.arrayOf(shopifyProductPropTypes),
  cartPrice: PropTypes.string,
  isOpen: PropTypes.bool,
  toggleCart: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  cartItems: cartItemsSelector(state),
  cartPrice: cartPriceSelector(state),
  isOpen: state.cart.isOpen,
});

export { Cart as CartUnconnected };
export default connect(mapStateToProps, {
  toggleCart,
})(Cart);
