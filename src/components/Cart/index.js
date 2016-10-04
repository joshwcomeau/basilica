// eslint-disable-next-line no-unused-vars
import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';

import './index.scss';


const Cart = () => {
  const classes = classNames(['cart']);

  return (
    <div className={classes}>
      <h2>
        Your Cart
        <span className="item-count">2 Items</span>
      </h2>
    </div>
  );
};

Cart.propTypes = {

};

Cart.defaultProps = {

};

export default Cart;
