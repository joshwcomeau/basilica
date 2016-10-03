// eslint-disable-next-line no-unused-vars
import React, { Component, PropTypes } from 'react';

import Button from '../Button';
import './index.scss';


const AddToCartButton = ({ price }) => {
  return (
    <Button
      icon="add_to_cart"
      theme="dark"
      size="medium"
      withInnerBorder
    >
      {price} | Add To Cart
    </Button>
  );
};

AddToCartButton.propTypes = {
  price: PropTypes.string,
};

AddToCartButton.defaultProps = {

};

export default AddToCartButton;
