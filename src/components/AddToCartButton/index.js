// eslint-disable-next-line no-unused-vars
import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';

import Button from '../Button';
import './index.scss';


const AddToCartButton = ({ price, available, onClick }) => {
  const classes = classNames('add-to-cart-button', { available });

  const buttonText = available
    ? 'Add To Cart'
    : 'Out of Stock';

  return (
    <Button
      className={classes}
      icon="add_to_cart"
      theme="dark"
      size="medium"
      disabled={!available}
      withInnerBorder
      onClick={onClick}
    >
      {price}
      <span className="add-to-cart-divider">|</span>
      {buttonText}
    </Button>
  );
};

AddToCartButton.propTypes = {
  price: PropTypes.string,
  available: PropTypes.bool,
  onClick: PropTypes.func,
};

export default AddToCartButton;
