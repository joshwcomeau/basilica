// eslint-disable-next-line no-unused-vars
import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';

import Button from '../Button';
import './index.scss';


const CheckoutButton = ({ onClick }) => {
  const classes = classNames(['checkout-button']);

  return (
    <Button
      className={classes}
      icon="check"
      theme="primary"
      size="medium"
      withInnerBorder
      onClick={onClick}
    >
      Proceed to Checkout
    </Button>
  );
};

CheckoutButton.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default CheckoutButton;
