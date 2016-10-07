// eslint-disable-next-line no-unused-vars
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import pluralize from 'pluralize';

import {
  checkout,
  toggleCart,
  updateCartQuantityRequest,
  removeCartItemRequest,
} from '../../actions';
import cartItemsSelector from '../../selectors/cart-items.selector';
import cartPriceSelector from '../../selectors/cart-price.selector';
import shopifyProductPropTypes from '../../prop-types/shopify-product';

import Button from '../Button';
import CartItem from '../CartItem';
import Icon from '../Icon';
import './index.scss';


const Cart = ({
  cartItems,
  cartPrice,
  isOpen,
  cartError,
  checkout,
  toggleCart,
  removeCartItemRequest,
  updateCartQuantityRequest,
}) => {
  const containerClasses = classNames([
    'cart-container',
    { 'is-visible': isOpen },
  ]);
  const cartClasses = classNames([
    'cart',
    { 'is-visible': isOpen },
  ]);
  const backdropClasses = classNames([
    'cart-backdrop',
    { 'is-visible': isOpen },
  ]);

  const errorMessage = cartError && (
    <div className="cart-error-message">{cartError}</div>
  );

  return (
    <div className={containerClasses}>
      <div className={cartClasses}>
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
              updateCartQuantity={updateCartQuantityRequest}
              removeCartItem={removeCartItemRequest}
              key={`${item.product_id}-${item.variant.id}`}
            />
          )}
        </div>

        {errorMessage}

        <div className="cart-checkout">
          <span className="cart-price">
            <span className="cart-price-label">Total</span>
            {cartPrice}
          </span>
          <Button theme="dark" onClick={checkout}>Proceed to Checkout</Button>
        </div>
      </div>

      <button className={backdropClasses} onClick={toggleCart} />
    </div>
  );
};

Cart.propTypes = {
  cartItems: PropTypes.arrayOf(shopifyProductPropTypes),
  cartPrice: PropTypes.string,
  isOpen: PropTypes.bool,
  cartError: PropTypes.string,
  checkout: PropTypes.func.isRequired,
  toggleCart: PropTypes.func.isRequired,
  removeCartItemRequest: PropTypes.func.isRequired,
  updateCartQuantityRequest: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  cartItems: cartItemsSelector(state),
  cartPrice: cartPriceSelector(state),
  isOpen: state.cart.isOpen,
  cartError: state.cart.error,
});

export { Cart as CartUnconnected };
export default connect(mapStateToProps, {
  checkout,
  toggleCart,
  removeCartItemRequest,
  updateCartQuantityRequest,
})(Cart);
