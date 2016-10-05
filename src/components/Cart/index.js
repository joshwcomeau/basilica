// eslint-disable-next-line no-unused-vars
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';

import { toggleCart } from '../../actions';
import cartItemsSelector from '../../selectors/cart-items.selector';
import shopifyProductPropTypes from '../../prop-types/shopify-product';

import Icon from '../Icon';
import CartItem from '../CartItem';
import './index.scss';


const Cart = ({ cartItems, isOpen, toggleCart }) => {
  const classes = classNames(['cart', { 'is-visible': isOpen }]);

  return (
    <div className={classes}>
      <button className="close-cart" onClick={toggleCart}>
        <Icon value="close" />
      </button>

      <h2 className="cart-title">
        Your Cart
        <span className="item-count">2 Items</span>
      </h2>

      <div className="cart-contents">
        {cartItems.map(item =>
          <CartItem
            item={item}
            key={`${item.product_id}-${item.variant.id}`}
          />
        )}
      </div>
    </div>
  );
};

Cart.propTypes = {
  cartItems: PropTypes.arrayOf(shopifyProductPropTypes),
  isOpen: PropTypes.bool,
  toggleCart: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  cartItems: cartItemsSelector(state),
  isOpen: state.cart.isOpen,
});

export { Cart as CartUnconnected };
export default connect(mapStateToProps, {
  toggleCart,
})(Cart);
