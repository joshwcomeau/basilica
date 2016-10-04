/* eslint-disable react/no-danger */
// eslint-disable-next-line no-unused-vars
import React, { PureComponent, PropTypes } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';

import AddToCartButton from '../AddToCartButton';
import ToggleRow from '../ToggleRow';
import './index.scss';


class ProductsListItem extends PureComponent {
  constructor(props) {
    super(props);

    this.updateVariantId = this.updateVariantId.bind(this);

    this.state = {
      selectedVariantId: props.product.variants[0].id,
    };
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

    const {
      available,
      body_html,
      title,
      images,
      variants,
    } = this.props.product;

    const yearOptions = this.createYearOptions();

    const selectedVariant = variants.find(variant => (
      variant.id === this.state.selectedVariantId
    ));

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

          <ToggleRow
            className="product-year-select"
            items={yearOptions}
            activeItem={this.state.selectedVariantId}
            prefix="Year"
            onClickItem={this.updateVariantId}
          />

          <AddToCartButton
            price={selectedVariant.formatted_price}
            available={available}
          />
        </div>
      </div>
    );
  }
}

ProductsListItem.propTypes = {
  id: PropTypes.string,
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
      title: PropTypes.string.isRequired, // This is actually the 'year'
      price: PropTypes.string.isRequired,
      formatted_price: PropTypes.string.isRequired,
    })).isRequired,
  }).isRequired,
};

const mapStateToProps = (state, ownProps) => ({
  product: state.products.byId[ownProps.id],
});

export default connect(mapStateToProps)(ProductsListItem);
