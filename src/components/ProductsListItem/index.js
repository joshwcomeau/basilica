/* eslint-disable react/no-danger */
// eslint-disable-next-line no-unused-vars
import React, { PureComponent, PropTypes } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';

import { lightboxOpen, addToCartRequest, checkout } from '../../actions';
import { includedVariantsSelector } from '../../reducers/cart.reducer';
import shopifyProductPropTypes from '../../prop-types/shopify-product';

import AddToCartButton from '../AddToCartButton';
import CheckoutButton from '../CheckoutButton';
import ProductListItemPhoto from '../ProductListItemPhoto';
import ToggleRow from '../ToggleRow';
import './index.scss';


class ProductsListItem extends PureComponent {
  constructor(props) {
    super(props);

    this.updateVariantId = this.updateVariantId.bind(this);
    this.viewPhoto = this.viewPhoto.bind(this);
    this.addToCart = this.addToCart.bind(this);

    this.state = {
      selectedVariantId: props.product.variants[0].id,
    };
  }

  viewPhoto() {
    const imageUrls = this.props.product.images.map(image => (
      image.src
    ));

    this.props.lightboxOpen({
      urls: imageUrls,
    });
  }

  addToCart() {
    this.props.addToCartRequest({
      product: this.props.product,
      variantId: this.state.selectedVariantId,
    });
  }

  updateVariantId(variantId) {
    this.setState({ selectedVariantId: variantId });
  }

  createYearOptions() {
    return this.props.product.variants.map(variant => ({
      value: variant.id,
      label: variant.title,
    }));
  }

  render() {
    const classes = classNames(['products-list-item']);

    const { product, variantsInCart, checkout } = this.props;
    const {
      product_id,
      available,
      body_html,
      title,
      images,
      variants,
    } = product;

    const { selectedVariantId } = this.state;

    const yearOptions = this.createYearOptions();

    const selectedVariant = variants.find(variant => (
      variant.id === selectedVariantId
    ));

    // We either want to show the first image in our `images` array,
    // OR the image that corresponds with our variant. Annoyingly,
    // Shopify's data format is very odd, so we need to work around that.
    const variantImage = images.find(image => (
      image.variant_ids[0] === selectedVariantId
    ));
    const imageUrl = variantImage ? variantImage.src : images[0].src;

    const relevantVariants = variantsInCart[product_id];
    const isVariantInCart = (
      relevantVariants &&
      relevantVariants.includes(selectedVariantId)
    );

    let button;
    if (isVariantInCart) {
      button = (
        <CheckoutButton
          onClick={checkout}
        />
      );
    } else {
      button = (
        <AddToCartButton
          price={selectedVariant.formatted_price}
          available={available}
          onClick={this.addToCart}
        />
      );
    }

    return (
      <div className={classes}>
        <ProductListItemPhoto
          imageUrl={imageUrl}
          altText={title}
          onClick={this.viewPhoto}
        />
        <div className="product-info">
          <h3>{title}</h3>
          <div
            className="product-description"
            dangerouslySetInnerHTML={{ __html: body_html }}
          />

          <ToggleRow
            className="product-year-select"
            items={yearOptions}
            activeItem={this.state.selectedVariantId}
            prefix="Year"
            onClickItem={this.updateVariantId}
          />

          {button}
        </div>
      </div>
    );
  }
}

ProductsListItem.propTypes = {
  id: PropTypes.string,
  product: shopifyProductPropTypes.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  variantsInCart: PropTypes.object,
  lightboxOpen: PropTypes.func,
  addToCartRequest: PropTypes.func,
  checkout: PropTypes.func,
};

ProductsListItem.defaultProps = {
  variantsInCart: {},
};

const mapStateToProps = (state, ownProps) => ({
  product: state.products.byId[ownProps.id],
  variantsInCart: includedVariantsSelector(state),
});

export default connect(mapStateToProps, {
  checkout,
  lightboxOpen,
  addToCartRequest,
})(ProductsListItem);
