/* eslint-disable react/no-danger */
// eslint-disable-next-line no-unused-vars
import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';

import AddToCartButton from '../AddToCartButton';
import './index.scss';


class ProductsListItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedVariantId: props.product.variants[0].id,
    };
  }
  render() {
    const classes = classNames(['products-list-item']);

    const {
      available,
      body_html,
      product_id,
      title,
      images,
      variants,
    } = this.props.product;


    // We either want to show the first image in our `images` array,
    // OR the image that corresponds with our variant. Annoyingly,
    // Shopify's data format is very odd, so we need to work around that.
    const variantImage = images.find(image => (
      image.variant_ids[0] === this.state.selectedVariantId
    ));
    const imageUrl = variantImage ? variantImage.src : images[0].src;

    return (
      <div className={classes}>
        <div className="product-photo">
          <img src={imageUrl} width="500" alt={title} />
        </div>
        <div className="product-info">
          <h3>{title}</h3>
          <div
            className="product-description"
            dangerouslySetInnerHTML={{ __html: body_html }}
          />
          <AddToCartButton />
        </div>
      </div>
    );
  }
}

ProductsListItem.propTypes = {
  product: PropTypes.shape({
    available: PropTypes.bool.isRequired,
    body_html: PropTypes.string.isRequired,
    product_id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    images: PropTypes.arrayOf(PropTypes.shape({
      src: PropTypes.string.isRequired,
    })),
    variants: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number.isRequired,
      available: PropTypes.bool.isRequired,
      title: PropTypes.string.isRequired,
      price: PropTypes.string.isRequired,
      formatted_price: PropTypes.string.isRequired,
    })).isRequired,
  }).isRequired,
};

ProductsListItem.defaultProps = {

};

export default ProductsListItem;
