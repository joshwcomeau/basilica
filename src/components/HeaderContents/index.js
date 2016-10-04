// eslint-disable-next-line no-unused-vars
import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';

import Badge from '../Badge';
import Icon from '../Icon';
import './index.scss';


const HeaderContents = ({ toggleCart }) => {
  const classes = classNames(['header-contents']);

  return (
    <div className={classes}>
      <button className="cart-button" onClick={toggleCart}>
        <Badge className="cart-badge">2</Badge>
        <span className="cart-text">CART</span>
        <Icon value="shopping_cart" size={16} />
      </button>
    </div>
  );
};

HeaderContents.propTypes = {
  toggleCart: PropTypes.func,
};

export default HeaderContents;
