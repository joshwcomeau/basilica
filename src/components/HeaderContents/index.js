// eslint-disable-next-line no-unused-vars
import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';

import Badge from '../Badge';
import Icon from '../Icon';
import './index.scss';


const HeaderContents = ({ toggleCart, numOfCartItems }) => {
  const classes = classNames(['header-contents']);

  const badge = numOfCartItems > 0 && (
    <Badge className="cart-badge">{numOfCartItems}</Badge>
  );

  return (
    <div className={classes}>
      <button className="cart-button" onClick={toggleCart}>
        {badge}
        <span className="cart-text">CART</span>
        <Icon value="shopping_cart" size={16} />
      </button>
    </div>
  );
};

HeaderContents.propTypes = {
  numOfCartItems: PropTypes.number,
  toggleCart: PropTypes.func,
};

export default HeaderContents;
